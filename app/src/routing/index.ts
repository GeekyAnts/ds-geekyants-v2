// ─── Routing Module Exports ───────────────────────────────────────────────────

export { RouterProvider, useRouter, useRouteEffect } from './router.tsx'
export {
  buildRoute,
  parseRoute,
  getCurrentRoute,
  navigate,
  replaceRoute,
  foundationsUrl,
  semanticUrl,
  tokenUrl,
  ROUTES,
  routeComponents,
  registerRouteComponent,
  getRouteComponent,
} from './routes.ts'
export type { RoutePath } from './routes.ts'

