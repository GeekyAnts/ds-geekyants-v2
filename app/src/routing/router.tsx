// ─── Hash-Based Router ────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react'
import type { RoutePath } from './routes.ts'
import { getCurrentRoute, navigate } from './routes.ts'

interface RouterContextValue {
  route: RoutePath
  navigate: (route: RoutePath) => void
  goBack: () => void
  goForward: () => void
  canGoBack: boolean
  canGoForward: boolean
  hash: string
}

const RouterContext = createContext<RouterContextValue | null>(null)

/**
 * Router provider component
 */
export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>(getCurrentRoute())
  const [history, setHistory] = useState<RoutePath[]>([getCurrentRoute()])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Listen to hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = getCurrentRoute()
      setCurrentRoute(newRoute)
      setHistory(prev => {
        const lastRoute = prev[prev.length - 1]
        if (!lastRoute || 
            lastRoute.type !== newRoute.type ||
            JSON.stringify(lastRoute) !== JSON.stringify(newRoute)) {
          return [...prev.slice(0, historyIndex + 1), newRoute]
        }
        return prev
      })
      setHistoryIndex(prev => prev + 1)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [historyIndex])

  const navigateCallback = useCallback((route: RoutePath) => {
    navigate(route)
  }, [])

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      const prevRoute = history[newIndex]
      setCurrentRoute(prevRoute)
      window.history.back()
    }
  }, [historyIndex, history])

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      const nextRoute = history[newIndex]
      setCurrentRoute(nextRoute)
      window.history.forward()
    }
  }, [historyIndex, history])

  const contextValue: RouterContextValue = {
    route: currentRoute,
    navigate: navigateCallback,
    goBack,
    goForward,
    canGoBack: historyIndex > 0,
    canGoForward: historyIndex < history.length - 1,
    hash: window.location.hash,
  }

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  )
}

/**
 * Consumer hook for router
 */
export function useRouter(): RouterContextValue {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter must be used within RouterProvider')
  }
  return context
}

/**
 * Hook to run effect when route changes
 */
export function useRouteEffect(
  effect: (route: RoutePath) => void, 
  deps: React.DependencyList = []
) {
  const { route } = useRouter()
  useEffect(() => {
    effect(route)
    // Custom passthrough hook: the consumer controls re-runs via `deps` (mirroring
    // useEffect's own contract), and `effect` is intentionally excluded so a fresh
    // closure each render doesn't force a re-run. The spread is the hook's API.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, ...deps])
}
