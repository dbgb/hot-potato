import { useState, useEffect } from "react";

/*
 * React hook to provide an accurate indicator of whether a component has
 * mounted.
 *
 * `hasMounted` can be used to determine whether browser API's are available
 * (component is mounted), or are not available (DOM is being built as a part of
 * SSR, or currently in a pre-hydrated state).
 */
function useHasMounted() {
  // defaults to false, and latches to true when mounted.
  const [hasMounted, setHasMounted] = useState(false);
  /*
   * `useEffect` only fires if the component is mounted. Since this side effect
   * doesn't depend on any props/state values, passing an empty deps array tells
   * React that this effect only needs to run once, when it is first triggered.
   */
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}

export default useHasMounted;
