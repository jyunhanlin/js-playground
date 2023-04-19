const randomInteger = (minimum, maximum) =>
  Math.floor(Math.random() * (maximum - minimum + 1) + minimum);

const createDelay =
  ({ willResolve }) =>
  (ms, { value } = {}) => {
    let timeoutId;
    let settle;
    const delayPromise = new Promise((resolve, reject) => {
      settle = () => {
        if (willResolve) {
          resolve(value);
        } else {
          reject(value);
        }
      };
      timeoutId = setTimeout(settle, ms);
    });

    delayPromise.clear = () => {
      clearTimeout(timeoutId);
      timeoutId = null;
      settle();
    };

    return delayPromise;
  };

const createAbortError = () => {
  const error = new Error('Delay aborted');
  error.name = 'AbortError';
  return error;
};

const createDelayWithAbort =
  ({ willResolve }) =>
  (ms, { value, signal } = {}) => {
    if (signal && signal.aborted) {
      return Promise.reject(createAbortError());
    }

    let timeoutId;
    let settle;
    let rejectFn;

    const delayPromise = new Promise((resolve, reject) => {
      settle = () => {
        if (signal) {
          signal.removeEventListener('abort', signalListener);
        }
        if (willResolve) {
          resolve(value);
        } else {
          reject(value);
        }
      };

      rejectFn = reject;
      timeoutId = setTimeout(settle, ms);
    });

    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          clearTimeout(timeoutId);
          rejectFn(createAbortError());
        },
        { once: true }
      );
    }

    delayPromise.clear = () => {
      clearTimeout(timeoutId);
      timeoutId = null;
      settle();
    };

    return delayPromise;
  };

const createWithTimers = () => {
  const delay = createDelay({ willResolve: true });
  delay.reject = createDelay({ willResolve: false });
  delay.range = (minimum, maximum, options) => delay(randomInteger(minimum, maximum), options);
  return delay;
};
