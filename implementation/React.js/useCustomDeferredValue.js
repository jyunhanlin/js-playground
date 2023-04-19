import { useState, useEffect } from 'react';

function useCustomDeferredValue(value) {
  const [prevValue, setValue] = useState(value);

  useEffect(() => {
    requestIdleCallback(() => setValue(value));
  }, [value]);

  return prevValue;
}

export { useCustomDeferredValue };
