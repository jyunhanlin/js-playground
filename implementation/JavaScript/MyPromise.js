const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.data = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      reject(e);
    }
  }

  resolve = (value) => {
    if (this.status === PENDING) {
      setTimeout(() => {
        this.status = FULFILLED;
        this.data = value;
        this.onFulfilledCallbacks.forEach((cb) => cb(value));
      });
    }
  };

  reject = (error) => {
    if (this.status === PENDING) {
      setTimeout(() => {
        this.status = REJECTED;
        this.data = error;
        this.onRejectedCallbacks.forEach((cb) => cb(error));
      });
    }
  };

  then = (onFulfilled, onRejected) => {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.data);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.data);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if ((this.status = PENDING)) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.data);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.data);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  };

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(callBack) {
    return this.then(callBack, callBack);
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    } else if (value instanceof Object && 'then' in value) {
      return new MyPromise((resolve, reject) => {
        value.then(resolve, reject);
      });
    }

    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        const result = [];
        let count = 0;

        if (promises.length === 0) {
          return resolve(promises);
        }

        promises.forEach((item, index) => {
          MyPromise.resolve(item).then(
            (value) => {
              count++;

              result[index] = value;

              count === promises.length && resolve(result);
            },
            (reason) => {
              reject(reason);
            }
          );
        });
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        const result = [];
        let count = 0;

        if (promises.length === 0) return resolve(promises);

        promises.forEach((item, index) => {
          MyPromise.resolve(item).then(
            (value) => {
              count++;

              result[index] = {
                status: FULFILLED,
                value,
              };

              count === promises.length && resolve(result);
            },
            (reason) => {
              count++;

              result[index] = {
                status: REJECTED,
                reason,
              };

              count === promises.length && resolve(result);
            }
          );
        });
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        const errors = [];
        let count = 0;

        if (promises.length === 0) return reject(new AggregateError('All promises were rejected'));

        promises.forEach((item) => {
          MyPromise.resolve(item).then(
            (value) => {
              resolve(value);
            },
            (reason) => {
              count++;
              errors.push(reason);

              count === promises.length && reject(new AggregateError(errors));
            }
          );
        });
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        if (promises.length > 0) {
          promises.forEach((item) => {
            MyPromise.resolve(item).then(resolve, reject);
          });
        }
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      x.then(function (value) {
        resolvePromise(promise2, value, resolve, reject);
      }, reject);
    } else if (x.status === FULFILLED) {
      resolve(x.data);
    } else if (x.status === REJECTED) {
      reject(x.data);
    }
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      var then = x.then;
    } catch (e) {
      return reject(e);
    }

    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (e) {
        if (called) return;
        called = true;

        reject(e);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
};

// for promises-aplus-test
MyPromise.deferred = function () {
  let result = {};
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

module.exports = MyPromise;
