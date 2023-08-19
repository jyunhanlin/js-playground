import { useRef, useEffect, useCallback } from 'react';

export const useUpdatedCallback = (cb) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = cb;
  });

  return useCallback(() => {
    ref.current?.();
  }, []);
};
