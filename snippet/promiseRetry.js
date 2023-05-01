/**
 * Wait for the given milliseconds
 * @param {number} milliseconds The given time to wait
 * @returns {Promise} A fulfilled promise after the given time has passed
 */
function waitFor(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Execute a promise and retry
 * based on the maximum retry attempts it can perform
 * @param {object} options
 * @param {(retries: number) => Promise|Promise} options.promise - a promise or a promise function
 * @param {(retries: number) => number|number} [options.nextTimeToWait] - can be a number or backoff function
 * @param {(retries: number) => any} [options.onRetry]
 * @param {(error: any, retries: number) => any} [options.onError]
 * @param {number} [options.maxRetries=3]
 * @return {Promise}
 */
function promiseRetry({
  promise,
  nextTimeToWait = (retries) => 2 ** retries * 1000,
  onRetry,
  onError,
  maxRetries = 3,
}) {
  async function retryPromise(retries) {
    try {
      if (retries > 0) {
        let timeToWait = nextTimeToWait;
        if (typeof nextTimeToWait === 'function') timeToWait = nextTimeToWait(retries);
        console.log(`waiting for ${timeToWait}ms...`);
        await waitFor(timeToWait);
      }

      if (typeof promise === 'function') return await promise(retries);

      return await promise;
    } catch (e) {
      if (retries <= maxRetries) {
        onRetry?.(retries);
        return retryPromise(retries + 1);
      } else {
        onError?.(error, retries);
        throw e;
      }
    }
  }

  return retryPromise(0);
}
