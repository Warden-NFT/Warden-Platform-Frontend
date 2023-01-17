import { useEffect } from 'react'

/**
 * Utility hook to run async function inside
 * an ordinary useEffect().
 * @param fn
 * @param deps
 */
function useAsyncEffect(fn: () => Promise<void>, deps: any[]) {
  useEffect(() => {
    fn()
  }, deps)
}

export default useAsyncEffect
