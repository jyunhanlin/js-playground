import { useCallback, useSyncExternalStore } from 'react';

export function createState(initialValue) {
  return {
    listeners: [],
    state: initialValue,
  };
}

export function useGlobalState(config) {
  const setState = useCallback((stateOrSetter) => {
    let next = stateOrSetter;
    if (typeof stateOrSetter === 'function') {
      next = stateOrSetter(config.state);
    }
    config.state = next;
    config.listeners.forEach((l) => l());
  }, []);

  const state = useSyncExternalStore(
    (listener) => {
      // Register the observer
      config.listeners.push(listener);

      // Cleanup when unmounting
      return () => config.listeners.filter((l) => l !== listener);
    },
    () => config.state
  );
  return [state, setState];
}
