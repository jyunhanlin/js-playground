import { createContext as createContextOrig, useLayoutEffect, useReducer, useRef } from 'react';

const createProvider = (ProviderOrig) => {
  const ContextProvider = ({ value, children }) => {
    const contextValue = useRef();
    if (!contextValue.current) {
      const listeners = new Set();
      contextValue.current = {
        value,
        listeners,
      };
    }
    useLayoutEffect(() => {
      contextValue.current.value = value;
      contextValue.current.listeners.forEach((listener) => {
        listener({ v: value });
      });
    }, [value]);
    return <ProviderOrig value={contextValue.current}>{children}</ProviderOrig>;
  };

  return ContextProvider;
};

export function createContext(defaultValue) {
  const context = createContextOrig({
    value: defaultValue,
    listeners: new Set(),
  });
  context.Provider = createProvider(context.Provider);
  delete context.Consumer;
  return context;
}

export function useContextSelector(context, selector) {
  const contextValue = useContextOrig(context);
  const { value, listeners } = contextValue;

  const selected = selector(value);

  const [_, dispatch] = useReducer(
    (prev, action) => {
      const { v } = action;
      if (Object.is(prev[0], v)) {
        return prev;
      }
      const nextSelected = selector(v);
      if (Object.is(prev[1], nextSelected)) {
        return prev;
      }
      return [v, nextSelected];
    },
    [value, selected]
  );

  useLayoutEffect(() => {
    listeners.add(dispatch);
    return () => {
      listeners.delete(dispatch);
    };
  }, [listeners]);

  return selected;
}
