# A-State Insurance — Architecture & Automation Reference

Bilingual (EN/ES), server-side-rendered Angular marketing site for a Texas insurance
agency. ~250 public URLs, SEO-driven, no CMS — all content lives in the repo as JSON
translation dictionaries and hand-built page components.

This document describes the system as it exists today, then identifies the seams where
automation pays off, with measurements taken from the working tree.

---

## 1. At a glance

| Dimension | Value |
| --- | --- |
| Framework | Angular 21.1 (**NgModule**, not standalone) + `@angular/ssr` 21.1 |
| Rendering | SSR on every request (`RenderMode.Server` for `**`); no prerendering |
| Server | Express 5 (`src/server.ts`) on port 4000, behind Apache reverse proxy |
| Languages | English (root) + Spanish (`/es/…`), via `@ngx-translate/core` 17 |
| Page components | 130 (all eagerly declared in one module) |
| Routes | 274 `component:` entries; 120 canonical page keys |
| Public URLs | 249 in `src/sitemap.xml` (hand-maintained) |
| Translation keys | 20,746 EN / 20,265 ES leaf keys |
| Client bundle | **12.1 MB** `main.js` (single chunk, no lazy loading) |
| Styling | Bootstrap 5.3 + FontAwesome 7 + 254k lines of component SCSS |
| Backend | External REST API at `api.astateinsurance.com` (lead capture only) |
| Deploy | `scp dist/myapp` → EC2 `/var/www`, PM2 + Apache SSL vhost |

---

## 2. Runtime architecture

### 2.1 Two bootstrap paths

```
BROWSER                                    SERVER
src/main.ts                                src/server.ts  (Express)
  platformBrowser()                          └─ AngularNodeAppEngine
  └─ AppModule                                    └─ src/main.server.ts
       (src/app/app-module.ts)                         └─ AppServerModule
                                                            (src/app/app.module.server.ts)
                                                            imports AppModule
                                                            + provideServerRendering(withRoutes(serverRoutes))
                                                            + TranslateLoader → TranslateServerLoader
```

`AppServerModule` re-uses `AppModule` wholesale and swaps exactly one provider: the
translation loader. In the browser translations arrive over HTTP from
`/assets/i18n/{lang}.json`; on the server `TranslateServerLoader`
(`src/app/services/translate-server.loader.ts`) reads the same file off disk, probing
three candidate paths so it works from `dist/`, from `process.cwd()`, and from `src/`
during dev.

### 2.2 Request lifecycle (production)

```
Client
  │
  ▼
Apache :443  (ec2config.txt)
  │  ├─ www.astateinsurance.com → 301 → astateinsurance.com
  │  └─ sets X-Forwarded-Proto / X-Forwarded-Host, proxies to localhost:4000
  ▼
Express (src/server.ts)
  │  1. SEO canonicalisation middleware (GET only; skips /assets, /media, *.ext,
  │     robots.txt, sitemap.xml, favicon.ico)
  │       → 301 to https://astateinsurance.com<path>/ if host, protocol,
  │         or trailing slash is off-canonical
  │  2. express.static(dist/myapp/browser, maxAge 1y, index:false, redirect:false)
  │  3. AngularNodeAppEngine.handle(req)  ← full SSR, every request, no cache
  ▼
Angular SSR
  │  APP_INITIALIZER blocks bootstrap until translations for the URL's language load
  │  Router resolves → TitleStrategy (SeoTitleStrategy) writes title/meta/canonical
  ▼
HTML  →  client hydration (provideClientHydration + withEventReplay)
```

Note: `dist/myapp/prerendered-routes.json` is `{"routes":{}}` — nothing is prerendered,
so every hit costs a full server render.

---

## 3. Directory map

```
src/
├── main.ts / main.server.ts / server.ts     bootstrap + Express host
├── index.html, styles.scss (618 lines), robots.txt, sitemap.xml (249 URLs)
├── environments/environment.ts              single env, production:true hardcoded
├── assets/
│   ├── i18n/en.json (49,095 lines)          ALL page copy, EN
│   ├── i18n/es.json (48,395 lines)          ALL page copy, ES
│   ├── meta-tag.en.json / .es.json          125 keys each — title/description/keywords
│   ├── locations.json (1,358 lines)         office data, {en:[…], es:[…]}
│   └── images/                              216 MB shipped to dist
└── app/
    ├── app-module.ts                        130 declarations, 1 module, eager
    ├── app-routing-module.ts (1,403 lines)  route tree + `routeTranslations` map
    ├── app.routes.server.ts                 `**` → RenderMode.Server
    ├── app.ts / app.html                    <app-header><router-outlet><app-footer>
    ├── components/    header, footer, foot-upper, testimonial-slider
    ├── directives/    phone-format, chip-navigation, banner-button-no-redirect
    ├── services/      language, seo-*, trailing-slash-*, translate-*, http, quote-lead
    └── pages/         130 page components
        ├── auto-insurance/        hub + 10 product pages + 50 *-tx city pages
        ├── home-insurance/        hub + 6
        ├── commercial-insurance/  hub + 10
        ├── life-insurance/        hub + 6
        ├── health-insurance/      hub + 9
        ├── surety-bond-insurance/ hub + 4
        ├── additional_insurance/  pet, title, title-transfer
        ├── get-*-quote/           8 quote funnels
        └── home, about, contact, careers, privacy, terms, thank-you,
            our-locations, location-detail, insurance-services
```

---

## 4. Routing & the bilingual URL system

`src/app/app-routing-module.ts` is the single most important file. It holds **two**
structures that must stay in sync by hand:

**(a) The route tree** — English routes at the root, Spanish nested under `path: 'es'`:

```ts
{ path: 'auto-insurance', children: [
    { path: '',            component: AutoInsurance, data: { metaPage: 'autoInsurance' } },
    { path: 'car-insurance', component: CarInsurance, data: { metaPage: 'carInsurance' } },
    { path: 'houston-tx',  component: HoustonTx,    data: { metaPage: 'houstonTx' } },
    …
]}
{ path: 'es', children: [
    { path: 'seguros-de-auto', children: [ …same components, Spanish slugs… ] }
]}
```

Every route carries `data.metaPage` — the key into `meta-tag.{lang}.json`.

**(b) `routeTranslations`** — 120 entries mapping a page key to its slug per language:

```ts
export const routeTranslations: Record<string, Record<string, string>> = {
  carInsurance: { en: 'auto-insurance/car-insurance', es: 'seguros-de-auto/seguro-de-carro' },
  houstonTx:    { en: 'auto-insurance/houston-tx',    es: 'seguros-de-auto/houston-tx' },
  …
};
```

This map is the routing API for the whole app. `Language.getRoute(key)` turns a key into
a `routerLink` array for the *current* language; `Language.setLanguage()` reverse-looks-up
the current slug to find its key, then navigates to the sibling slug. Header, footer, and
every page's chip/CTA links all go through it — so a page not registered here cannot be
linked to correctly, and the language switcher silently falls back to path-preserving
behaviour.

Spanish city slugs deliberately keep the English city name (`seguros-de-auto/houston-tx`).

### Trailing-slash canonicalisation (four layers)

All URLs canonically end in `/`. This is enforced independently at four levels — a change
to the rule needs all four touched:

1. `TrailingSlashUrlSerializer` — strips on `parse`, appends on `serialize` (so all
   `routerLink` output carries the slash).
2. `TrailingSlashRedirect` — browser-side `NavigationStart` interceptor, `replaceUrl`.
3. Express middleware in `server.ts` — 301 for real HTTP requests.
4. `TranslateHtmlPipe.normalizeInternalLinks()` — rewrites `href="/…"` inside
   translated HTML strings, because translation values contain raw anchors.

All four skip `/assets/`, `/media/`, and anything matching `/\.[a-zA-Z0-9]+$/`.

---

## 5. Internationalisation

- **Loader**: `provideTranslateHttpLoader({prefix:'/assets/i18n/', suffix:'.json'})` in
  the browser; `TranslateServerLoader` (fs read) on the server.
- **Language selection is URL-derived, not stored**: `Language.getLanguageFromUrl()`
  reads the first path segment; `/es/*` → `es`, everything else → `en`. `localStorage`
  is written but never read back for routing.
- **Boot ordering**: `APP_INITIALIZER` (`initializeTranslations`) awaits
  `translate.use(lang)` before the app bootstraps, so SSR HTML is never emitted with raw
  translation keys.
- **Two consumption styles**:
  - `{{ 'KEY' | translate }}` — plain text.
  - `[innerHTML]="'KEY' | translateHtml | async"` — for values containing markup;
    `TranslateHtmlPipe` sanitises via `bypassSecurityTrustHtml` and normalises internal
    hrefs. It is `pure: false`, so it re-evaluates on every change-detection cycle.
- **Structural data in translations**: FAQ lists, neighbourhood tables, and chip labels
  are pulled with `translate.instant('CITY_TX.FAQ.ITEMS')` returning arrays/objects, not
  strings. Components re-run their builders on `onLangChange`.

### Key namespace

```
HEADER, HOME, ABOUT, CONTACT, …                 site chrome + static pages
<PRODUCT>_INSURANCE (e.g. CAR_INSURANCE)        one block per product page
GLOBAL_TX                                       200 leaves — copy shared by ALL city pages
<CITY>_TX  ×50 (HOUSTON_TX, WACO_TX, …)         6,566 leaves total, ~131 per city
```

`GLOBAL_TX` is the template layer and the city blocks are the per-city slots. Measured on
`waco-tx.html`: **169 distinct `GLOBAL_TX` keys vs 54 city-specific keys** — roughly
three quarters of a city page's copy is already shared. This is the pre-existing
foundation that makes the automation in §10 straightforward.

---

## 6. SEO system

Four cooperating pieces:

| Piece | File | Responsibility |
| --- | --- | --- |
| Meta dictionary | `assets/meta-tag.{en,es}.json` | 125 keys → `{title, description, keywords}` |
| Static import | `services/seo-meta.ts` | Imports both JSONs into the bundle; `getSeoPageMeta(key, lang)` with EN fallback |
| Title strategy | `services/seo-title-strategy.ts` | On every navigation: sets `<html lang>`, canonical `<link>`, `og:url`, title, description, keywords, `og:title`, `og:description` |
| URL canonicalisation | `services/seo-url.ts` | `SEO_CANONICAL_ORIGIN`, host allowlist, redirect URL builder — shared by Express and the title strategy |

`SeoTitleStrategy` reads `metaPage` from the *deepest* activated route. Location detail
pages have no static `metaPage`, so it falls back to path-sniffing:
`/our-locations/<id>/` → meta key `location_<id>`. `LocationDetail` also applies the same
meta itself (`applySeoFallback`) because it re-resolves on language change.

`meta-tag.*.json` are `import`ed rather than fetched — they are compiled into the bundle,
so a copy change requires a rebuild, not just a redeploy of assets.

**Duplicate-content guard**: `npm run seo:duplicates` (`tools/check-duplicate-pages.mjs`)
walks every `<loc>` in `src/sitemap.xml`, fetches it from a running SSR server, MD5s the
full HTML, and reports pages that hash identically. This tool exists because 50 city
pages share one template — it is the safety net for the automation in §10.

---

## 7. Content & data layer

There is no CMS or database. Three sources:

1. **`assets/i18n/{en,es}.json`** — all page copy, keyed as in §5.
2. **`assets/meta-tag.{en,es}.json`** — per-page SEO metadata.
3. **`assets/locations.json`** — office directory, shaped `{ en: [...], es: [...] }`.
   Each entry carries id, address, phone, hours, languages, Google Maps embed +
   directions URLs, CTA labels, and a nested `detailPage` object with full page copy.
   Fetched at runtime over HTTP by `LocationDetail` and `OurLocations` (not imported),
   so office content *can* be updated without a rebuild.

Per-city numeric data (carrier rate tables, ZIP-code rate rows, outbound citation links)
is **hardcoded in each city's `.ts` file**, not in JSON — see §9.

---

## 8. Forms & lead capture

Two paths, both posting to `environment.baseUrl` (`https://api.astateinsurance.com/a-state-backend/api`):

- **`QuoteLeadCaptureService`** — the short "chip + name + phone" banner form.
  `POST /quotes/short-form`, validates client-side, shows SweetAlert2 toasts.
- **`HttpService`** — generic `get`/`post` with SweetAlert2 success/error dialogs baked
  into the interceptor-style `tap`/`catchError`. Reads a bearer token from
  `localStorage`, which will throw during SSR if `headerToken` is ever touched
  server-side.

Three directives support the forms:

- `PhoneFormatDirective` — `input[appPhoneFormat], input[formControlName=phone_number]`,
  formats to `(281) 749-1900`, syncs the reactive control.
- `ChipNavigationDirective` — `[appChipNav]`, manages `.selected` state and stamps
  `data-chip-key` for the submit directive to read.
- `BannerButtonNoRedirectDirective` — `button[appBannerQuoteSubmit]`. Intercepts the
  click, scrapes the surrounding `.topSub2` container's DOM for the selected chip and
  inputs, submits, then routes to the right quote funnel using a 30-entry
  chip-key→route-key map plus URL-prefix parent detection.

The banner directive reads form state out of the **DOM** rather than from component
state — deliberate, since it must work identically across ~130 differently-authored
templates, but it makes the markup contract (`.topSub2`, `.chip.selected`, `.inps input`)
load-bearing and undocumented outside that file.

---

## 9. The duplication problem (measured)

This is the reason the project is hard to automate today.

### City pages: 50 near-identical copies

```
src/app/pages/auto-insurance/<city>-tx/
    <city>-tx.html    ~74 KB
    <city>-tx.scss    ~59 KB
    <city>-tx.ts      ~13 KB
    <city>-tx.spec.ts
```

Measured across all 50:

| Fact | Measurement |
| --- | --- |
| Total on disk | **7.8 MB** |
| SCSS files byte-identical | **49 of 50** (Houston differs by 20 lines: one colour, one `display`, three gap values) |
| HTML diff, Houston vs Baytown | 254 diff lines out of ~1,900 — and almost every one is only the `HOUSTON_TX.` → `BAYTOWN_TX.` key prefix |
| TS diff, Houston vs Waco | 76 lines — the key prefix plus the rate/ZIP data arrays |
| Genuinely per-city content | i18n key prefix, `monthlyRates[]`, `zipRateRows[]`, 2–3 outbound citation links |

Everything else — the sticky table-of-contents engine, scroll-spy, mobile TOC toggle,
FAQ accordion, two quote-form state machines, `goToSelectedQuote` — is **copied verbatim
into all 50 components**, including the comment explaining the post-hydration
`[class.active]` workaround.

### Downstream cost

- `main.js` is **12.1 MB**. Component templates and styles are inlined into the bundle,
  so ~2.9 MB of byte-identical SCSS and ~3.7 MB of near-identical HTML ship to every
  visitor. The production budget in `angular.json` was raised to
  `maximumWarning: 8MB / maximumError: 16MB` to accommodate this.
- No lazy loading: `AppModule` declares all 130 components eagerly, so route-level code
  splitting is impossible without restructuring.
- A single template fix must be applied 50 times. Git history (`working`, `workin`,
  `all city pages done except 6 pages…`) reflects that cost.

### Other duplicate SCSS groups

`md5sum` across all page SCSS: one group of 49 (cities), one of 10, one of 9, one of 6,
one of 5, two of 4, one of 2. Product pages within a family (e.g. all six life-insurance
subpages) share byte-identical stylesheets.

### Hand-maintained parallel lists

Adding one page today means touching **seven** places, with nothing verifying agreement:

1. component files (`.ts` / `.html` / `.scss`)
2. `app-module.ts` — import + `declarations[]`
3. `app-routing-module.ts` — EN route + `data.metaPage`
4. `app-routing-module.ts` — ES route under `path: 'es'`
5. `app-routing-module.ts` — `routeTranslations` entry
6. `meta-tag.en.json` + `meta-tag.es.json`
7. `sitemap.xml` (both language URLs)
8. `i18n/en.json` + `i18n/es.json`

Current drift: 274 route entries, 266 with `metaPage`, 120 `routeTranslations` keys,
125 meta keys, 249 sitemap URLs.

---

## 10. Automation blueprint

Ordered by payoff-to-risk. Each phase is independently shippable.

### Phase 1 — Collapse the 50 city pages into one data-driven component

The i18n layer is *already* split into `GLOBAL_TX` (shared template copy) + `<CITY>_TX`
(slots). Only the component/template/style triplication has to go.

```
src/app/pages/auto-insurance/city/
    city-auto-insurance.ts          ← the one component (TOC, scroll-spy, FAQ, forms)
    city-auto-insurance.html        ← the one template, key prefix from input
    city-auto-insurance.scss        ← the one stylesheet
src/assets/cities.json              ← per-city data, 50 entries
```

`cities.json` entry shape (everything that actually varies today):

```jsonc
{
  "slug": "baytown-tx",
  "i18nPrefix": "BAYTOWN_TX",
  "metaPage": "baytownTx",
  "monthlyRates": [{ "company": "USAA", "url": "https://www.usaa.com/",
                     "minimum": "$60", "fullCoverage": "$188" }],
  "zipRateRows": [{ "zipCode": "77520", "neighborhood": "Baytown West",
                    "monthlyRate": "$178" }],
  "citations": { "rates": { "label": "Way", "url": "https://www.way.com/" },
                 "zip":   { "label": "SmartFinancial", "url": "https://smartfinancial.com/texas/baytown-car-insurance" } }
}
```

Route it once per language with a param, resolving city data from the slug:

```ts
{ path: ':city', component: CityAutoInsurance, resolve: { city: cityResolver } }
```

Two details to preserve:

- **Carrier links are currently raw HTML inside the `company` string.** Move them to
  `{company, url}` and render with a template anchor — safer and diffable.
- **`metaPage` must stay per-city** so titles/descriptions remain unique. With a param
  route, resolve the meta key from the resolved city data rather than static `data`.

Expected result: −7.6 MB of source, −~6 MB of bundle, one place to fix a template bug.

**Verification gate**: run `npm run build:ssr && npm run start:ssr && npm run seo:duplicates`
before and after. The before-run establishes the baseline; the after-run must report the
same number of duplicate groups (ideally zero). This is exactly what that tool is for —
50 pages served from one template must still render 50 distinct HTML documents.

### Phase 2 — Single source of truth for the page registry

Replace the seven hand-maintained lists with one typed registry:

```ts
// src/app/pages.registry.ts
export const PAGES = [
  { key: 'carInsurance', component: CarInsurance,
    slug: { en: 'auto-insurance/car-insurance', es: 'seguros-de-auto/seguro-de-carro' },
    metaPage: 'carInsurance', sitemap: { priority: 0.8, changefreq: 'monthly' } },
  …
] as const;
```

Derive from it, at build time or module init:

- the EN route tree and the `path: 'es'` subtree (replacing 1,403 hand-written lines)
- `routeTranslations` (delete the hand-written map; `Language` keeps its current API)
- `src/sitemap.xml` — generated by a `tools/generate-sitemap.mjs` prebuild step
- a validation pass asserting every `metaPage` exists in both `meta-tag.*.json`

Adding a page then means: create the component, add one registry row, add the copy.

### Phase 3 — Content & translation integrity in CI

Add `tools/check-i18n-parity.mjs` and wire it into `npm test` / CI. It already has real
work to do — measured today:

- **547 keys present in `en.json` but missing from `es.json`** (including
  `HEADER.HOME`, `GET_LIFE_QUOTE.HEADING`, `INSURANCE_SERVICES.COVERDBANNER.*`).
  These silently fall back to English on Spanish pages.
- **66 keys in `es.json` with no English counterpart** — dead weight or EN gaps.
- **One cross-city key leak**: `houston-tx.html` reads
  `DALLAS_TX.UNINSURED.DETAILS.*` for seven fields. Phase 1 eliminates this class of bug
  structurally; until then a lint rule (`a city template may only reference GLOBAL_TX or
  its own prefix`) catches it. The exact check is in this repo's analysis and takes ~10
  lines of shell.

Also worth automating here: `meta-tag` key parity (EN/ES both at 125 — keep it that way),
and a check that every `sitemap.xml` URL resolves to a route.

### Phase 4 — Build & delivery

- **Lazy loading**: once Phase 1 and 2 land, split `AppModule` into feature modules
  (`auto`, `home`, `commercial`, `life`, `health`, `surety`, `quotes`) with
  `loadChildren`. This is what turns the 12 MB bundle into route-sized chunks; it is
  blocked today purely by the single eager module.
- **Prerendering**: content is fully static per URL. Switching
  `app.routes.server.ts` from `RenderMode.Server` to `RenderMode.Prerender` (with a
  route list from the Phase 2 registry) removes per-request render cost entirely. Keep
  `Server` mode only for `/our-locations/:id` if office data must stay runtime-editable.
- **Image budget**: `dist/myapp/browser/assets` is **216 MB** — larger than everything
  else combined. An `imagemin`/`sharp` prebuild producing WebP would be the single
  biggest win for real-world page weight.
- **Deploy script**: replace the README's manual
  `scp -r -i ec2.pem dist/myapp ubuntu@…:/var/www/` with `npm run deploy` wrapping
  build → rsync → `pm2 reload`. Note `ec2.pem` is currently committed in the repo root
  and should be moved out of version control.
- **Environments**: `environment.ts` hardcodes `production: true` with no
  `environment.development.ts` and no `fileReplacements` in `angular.json`. Dev builds
  therefore point at the production API. Splitting these is a prerequisite for safe
  automated testing of the lead-capture path.

---

## 11. Existing tooling

| Command / file | Purpose |
| --- | --- |
| `npm start` | `ng serve` — browser only, no SSR |
| `npm run dev:ssr` | `tools/dev-ssr.mjs` — `ng build --watch` + `node --watch` on the SSR bundle |
| `npm run build:ssr` | production build (browser + server) |
| `npm run start:ssr` | `node dist/myapp/server/server.mjs` |
| `npm run seo:duplicates` | `tools/check-duplicate-pages.mjs` — MD5s every sitemap URL against a running server, reports identical pages |
| `npm test` | `ng test` (Vitest). Specs are CLI-generated stubs; effectively no coverage |
| `tools/convert-translates.js` | one-off codemod: `{{ 'K' \| translate }}` → `[innerHTML]="'K' \| translateHtml \| async"` |
| `tools/convert-translates-loops.js`, `tools/fix-item-name-translate.js` | one-off codemods, already applied |
| `tools/apache-ssr.conf.example`, `tools/nginx-ssr.conf.example` | reverse-proxy templates |

The three `convert-*.js` codemods are precedent worth noting: this codebase is already
maintained by writing scripts that rewrite all pages at once. Phase 1 is the same
technique applied to the component layer instead of the template layer.

---

## 12. Conventions

- **Components are non-standalone** (`standalone: false`) — set as the schematic default
  in `angular.json`. New components must be added to `AppModule.declarations`.
- **Naming**: files are kebab-case without a `.component` suffix (`houston-tx.ts`,
  not `houston-tx.component.ts`); classes are PascalCase without a `Component` suffix
  (`HoustonTx`, `CarInsurance`).
- **TypeScript is strict** — `strict`, `noImplicitOverride`,
  `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, plus
  `strictTemplates` and `strictInjectionParameters`.
- **Never hardcode a URL in a template.** Use
  `[routerLink]="languageService.getRoute('pageKey')"`; most components expose a local
  `getRoute(page)` that forwards to it.
- **Never hardcode display copy.** Everything goes through `translate` /
  `translateHtml`, in both `en.json` and `es.json`.
- **Guard browser APIs.** SSR runs the same code: use `isPlatformBrowser(platformId)`
  or `typeof window === 'undefined'` before touching `window`, `document`, or
  `localStorage`.
- **Prettier**: `printWidth: 100`, `singleQuote: true`, Angular parser for HTML.

---

## 13. Known issues surfaced during this review

| Issue | Location | Impact |
| --- | --- | --- |
| 547 EN keys missing from `es.json` | `assets/i18n/es.json` | Spanish pages silently render English copy |
| Cross-city key leak | `houston-tx.html` → `DALLAS_TX.UNINSURED.DETAILS.*` | Houston shows Dallas penalty figures |
| 12.1 MB single JS bundle | `AppModule` eager declarations | Slow first load; budgets raised to 16 MB to hide it |
| 216 MB of unoptimised images | `src/assets/images` | Dominates transfer weight |
| Debug `console.log` on every request | `src/server.ts` SEO middleware | Noisy production logs |
| `ec2.pem` committed | repo root | Private key in version control |
| `environment.ts` has no dev variant | `src/environments/` | Dev builds hit the production API |
| Specs are generated stubs | `*.spec.ts` | No regression safety net for the refactors above |
| `import path from 'path'` unused | `app-routing-module.ts:55` | Node builtin pulled into a browser module |

---

*Generated from a full read of the working tree at commit `d498715`. Measurements
(file sizes, key counts, diff sizes, bundle sizes) were taken directly from the repo and
`dist/` and are reproducible with the commands in §11.*
