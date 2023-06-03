import { useRef, useEffect, useCallback } from 'react';

export const useAnimationFrame = () => {
  const id = useRef(0);

  // Cancel any pending requests when unmounting
  useEffect(
    () => () => {
      cancelAnimationFrame(id.current);
    },
    []
  );

  const cancel = useCallback(() => {
    cancelAnimationFrame(id.current);
  }, []);

  const request = useCallback((cb) => {
    cancelAnimationFrame(id.current);
    id.current = requestAnimationFrame(cb);
    return id.current; // For manual cancellation
  }, []);

  return { request, cancel };
};

const { request, cancel } = useAnimationFrame();

request(() => {
  /* Do something in the next repaint */
});
cancel(); // Cancel the currently pending request
