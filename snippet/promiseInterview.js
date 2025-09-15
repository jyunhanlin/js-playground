// concurrent promises
const concurrentPromises = (promises, limit) => {
  return new Promise((resolve, reject) => {
    let i = 0;
    let result = [];
    const executor = () => {
      if (i >= promises.length) {
        return resolve(result);
      }
      const promise = promises[i++];
      Promise.resolve(promise)
        .then((value) => {
          result.push(value);
          if (i < promises.length) {
            executor();
          } else {
            resolve(result);
          }
        })
        .catch(reject);
    };
    for (let j = 0; j < limit && j < promises.length; j++) {
      executor();
    }
  });
};

// promise with timeout
const promiseWithTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Timeout after ' + ms + 'ms')), ms)
    ),
  ]);

// cancellable promise

const cancellablePromise = (promise) => {
  let isCanceled = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (value) => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
      (error) => (isCanceled ? reject({ isCanceled, error }) : reject(error))
    );
  });
  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
};

// sequence promises
const sequencePromises = (promises) =>
  promises.reduce((prev, next) => prev.then(() => next()), Promise.resolve());

// retry promise
const retryPromise = (promiseFn, maxAttempts, interval) => {
  return new Promise((resolve, reject) => {
    const attempt = (attemptNumber) => {
      if (attemptNumber === maxAttempts) {
        reject(new Error('Max attempts reached'));
        return;
      }
      promiseFn()
        .then(resolve)
        .catch(() => {
          setTimeout(() => {
            attempt(attemptNumber + 1);
          }, interval);
        });
    };
    attempt(0);
  });
};

// once resolved promise
const onceResolvedPromise = (executor) => {
  let isResolved = false;
  return new Promise((resolve, reject) => {
    executor((value) => {
      if (!isResolved) {
        isResolved = true;
        resolve(value);
      }
    }, reject);
  });
};

// callback to promise
const callbackToPromise = (fn, ...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

// dynamic promise chain
const tasks = [task1, task2, task3]; // Array of asynchronous tasks

const promiseChain = tasks.reduce((chain, currentTask) => {
  return chain.then(currentTask);
}, Promise.resolve());

// simple async lock
let lock = Promise.resolve();

const acquireLock = () => {
  let release;
  const waitLock = new Promise((resolve) => {
    release = resolve;
  });
  const tryAcquireLock = lock.then(() => release);
  lock = waitLock;
  return tryAcquireLock;
};
