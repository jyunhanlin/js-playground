import { useState, useEffect, useCallback } from 'react';
import debounce from '../utils/debounce';

function useDebounceFn(fn, options) {
  return useCallback(debounce(fn, options.wait), []);
}

function useDebounce(value, options) {
  const [debounced, setDebounced] = useState(value);

  const update = useDebounceFn((value) => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    update(value);
  }, [value]);

  return debounced;
}

function useDebounceEffect(effect, options, deps) {
  const [debounced, setDebounced] = useState({});

  const update = useDebounceFn(() => {
    setDebounced({});
  }, options);

  useEffect(() => {
    update();
  }, deps);

  useEffect(effect, [debounced]);
}

export { useDebounceFn, useDebounce, useDebounce };
