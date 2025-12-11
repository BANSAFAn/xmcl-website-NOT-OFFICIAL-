import { useSyncExternalStore, useCallback } from 'react';

/**
 * Custom hook to get the current pathname, replacing react-router-dom's useLocation
 * Works with Astro's static pages by reading from window.location
 */
export function useLocation() {
  const getSnapshot = () => {
    if (typeof window === 'undefined') {
      return { pathname: '/', hash: '', search: '' };
    }
    return {
      pathname: window.location.pathname,
      hash: window.location.hash,
      search: window.location.search,
    };
  };

  const getServerSnapshot = () => ({
    pathname: '/',
    hash: '',
    search: '',
  });

  const subscribe = (callback: () => void) => {
    window.addEventListener('popstate', callback);
    window.addEventListener('hashchange', callback);
    return () => {
      window.removeEventListener('popstate', callback);
      window.removeEventListener('hashchange', callback);
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Custom hook to navigate programmatically, replacing react-router-dom's useNavigate
 * Works with regular page navigation in Astro
 */
export function useNavigate() {
  const navigate = useCallback((to: string | { hash?: string; pathname?: string }) => {
    if (typeof to === 'string') {
      window.location.href = to;
    } else {
      if (to.pathname) {
        window.location.pathname = to.pathname;
      }
      if (to.hash) {
        window.location.hash = to.hash;
      }
    }
  }, []);

  return navigate;
}

/**
 * Custom hook to get URL parameters, replacing react-router-dom's useParams
 * In Astro with static pages, we extract params from the URL path
 */
export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  if (typeof window === 'undefined') {
    return {} as T;
  }
  
  // Extract params from URL - this is a simple implementation
  // For dynamic routes in Astro, params are typically passed as props
  const pathname = window.location.pathname;
  const pathParts = pathname.split('/').filter(Boolean);
  
  // Return the last part of the path as 'id' for blog/guide style routes
  const result: Record<string, string> = {};
  if (pathParts.length > 1) {
    result.id = pathParts[pathParts.length - 1];
  }
  
  return result as T;
}
