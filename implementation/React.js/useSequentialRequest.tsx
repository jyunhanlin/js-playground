import { useCallback, useRef } from 'react';
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
export function useSequentialRequest<Args extends unknown[], Data>(
  requestFn: (signal: AbortSignal, ...args: Args) => Promise<Data>
) {
  const requestFnRef = useLatest(requestFn);
  const running = useRef(false);
  const abortController = useRef<AbortController | null>(null);
  return useCallback(
    async (...args: Args) => {
      if (running.current) {
        abortController.current?.abort();
        abortController.current = null;
      }
      running.current = true;
      const controller = abortController.current ?? new AbortController();
      abortController.current = controller;
      return requestFnRef.current(controller.signal, ...args).finally(() => {
        if (controller === abortController.current) {
          running.current = false;
        }
      });
    },
    [requestFnRef]
  );
}

// how to use it
import { useState } from 'react';
import { useSequentialRequest } from './useSequentialRequest';

export default function Home() {
  const [data, setData] = useState('');
  const run = useSequentialRequest(async (signal: AbortSignal, query: string) =>
    fetch(`/api/hello?query=${query}`, { signal }).then((res) => res.text())
  );
  const handleInput = async (queryStr: string) => {
    try {
      const res = await run(queryStr);
      setData(res);
    } catch {
      // ignore errors
    }
  };
  return (
    <>
      <input
        placeholder="Please input"
        onChange={(e) => {
          handleInput(e.target.value);
        }}
      />
      <div>Response Data: {data}</div>
    </>
  );
}
