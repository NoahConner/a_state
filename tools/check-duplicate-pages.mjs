import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const DEFAULT_SITEMAP_PATH = 'src/sitemap.xml';
const DEFAULT_BASE_URL = 'http://localhost:4000';

function parseArgs(argv) {
  const args = {
    sitemap: DEFAULT_SITEMAP_PATH,
    baseUrl: DEFAULT_BASE_URL,
    includeUnique: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--sitemap' && argv[i + 1]) {
      args.sitemap = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg === '--base-url' && argv[i + 1]) {
      args.baseUrl = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg === '--include-unique') {
      args.includeUnique = true;
    }
  }

  return args;
}

function extractUrlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
}

function normalizePathFromAbsoluteUrl(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname || '/';
  const search = parsed.search || '';

  return `${pathname}${search}`;
}

function hashHtml(html) {
  return createHash('md5').update(html).digest('hex');
}

async function fetchHtml(baseUrl, path) {
  const url = new URL(path, baseUrl).toString();
  const response = await fetch(url, {
    headers: {
      'user-agent': 'a-state-duplicate-check/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status} ${response.statusText}`);
  }

  return {
    url,
    html: await response.text(),
  };
}

function printGroup(hash, pages) {
  console.log(`\nHash: ${hash}`);
  console.log(`Count: ${pages.length}`);

  for (const page of pages) {
    console.log(`- ${page.url}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sitemapXml = await readFile(args.sitemap, 'utf8');
  const sitemapUrls = extractUrlsFromSitemap(sitemapXml);

  if (sitemapUrls.length === 0) {
    throw new Error(`No URLs found in sitemap: ${args.sitemap}`);
  }

  const groupedByHash = new Map();
  let checked = 0;

  for (const sitemapUrl of sitemapUrls) {
    const path = normalizePathFromAbsoluteUrl(sitemapUrl);
    const { url, html } = await fetchHtml(args.baseUrl, path);
    const hash = hashHtml(html);
    const currentGroup = groupedByHash.get(hash) ?? [];

    currentGroup.push({ url, path });
    groupedByHash.set(hash, currentGroup);
    checked += 1;
  }

  const groups = [...groupedByHash.entries()]
    .sort((a, b) => b[1].length - a[1].length);

  const duplicates = groups.filter(([, pages]) => pages.length > 1);

  console.log(`Checked ${checked} pages against ${args.baseUrl}`);
  console.log(`Found ${duplicates.length} duplicate hash group(s)`);

  const groupsToPrint = args.includeUnique ? groups : duplicates;

  for (const [hash, pages] of groupsToPrint) {
    printGroup(hash, pages);
  }

  if (duplicates.length === 0) {
    console.log('\nNo exact duplicate HTML pages were detected.');
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
