import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import {
  buildCanonicalRedirectUrl,
  isManagedSeoHost,
  SEO_CANONICAL_HOST,
} from './app/services/seo-url';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Redirect production traffic to the single canonical host and URL shape.
 */
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    next();
    return;
  }

  const forwardedHost = req.headers['x-forwarded-host'];
  const requestHost = Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost ?? req.get('host');

  if (!isManagedSeoHost(requestHost)) {
    next();
    return;
  }

  const forwardedProto = req.headers['x-forwarded-proto'];
  const requestProto = Array.isArray(forwardedProto)
    ? forwardedProto[0]
    : forwardedProto?.split(',')[0] ?? req.protocol;
  const normalizedHost = requestHost?.split(',')[0].trim().toLowerCase().split(':')[0];
  const canonicalUrl = buildCanonicalRedirectUrl(req.originalUrl);
  const needsSlashRedirect = canonicalUrl !== `https://${SEO_CANONICAL_HOST}${req.originalUrl}`;
  const needsHostRedirect = normalizedHost !== SEO_CANONICAL_HOST || requestProto !== 'https';

  if (needsSlashRedirect || needsHostRedirect) {
    res.redirect(301, canonicalUrl);
    return;
  }

  next();
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        writeResponseToNodeResponse(response, res);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.error(`\n❌ Prerender ERROR for route "${req.url}":`, err);
      next(err);
    });
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
