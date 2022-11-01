const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.data = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.data = value;
        this.onResolvedCallbacks.forEach((cb) => cb(value));
      }
    };

    const reject = (error) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = error;
        this.onRejectedCallbacks.forEach((cb) => cb(error));
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onResolved, onRejected) {
    onResolved =
      typeof onResolved === 'function'
        ? onResolved
        : function (v) {
            return v;
          };
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : function (e) {
            throw e;
          };

    let promise2;

    promise2 = new Promise((resolve, reject) => {
      if ((this.status = PENDING)) {
        this.onResolvedCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onResolved(this.data);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallback.push(() => {
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

      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onResolved(this.data);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.data);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
    });

    return promise2;
  }

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
        let result = [];
        let count = 0;

        if (promises.length === 0) {
          return resolve(promises);
        }

        promises.forEach((item, index) => {
          if (item instanceof MyPromise) {
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
          } else {
            count++;
            result[index] = item;
            count === promises.length && resolve(result);
          }
        });
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let result = [];
        let count = 0;

        if (promises.length === 0) return resolve(promises);

        promises.forEach((item, index) => {
          MyPromise.resolve(item).then(
            (value) => {
              count++;

              result[index] = {
                status: 'fulfilled',
                value,
              };

              count === promises.length && resolve(result);
            },
            (reason) => {
              count++;

              result[index] = {
                status: 'rejected',
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
        let errors = [];
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
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        if (promises.length > 0) {
          promises.forEach((item) => {
            myPromise.resolve(item).then(resolve, reject);
          });
        }
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  let called = false;

  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'));
  }

  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      x.then(function (value) {
        resolvePromise(promise2, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }

  if (
    x !== null &&
    (Object.prototype.toString(x) === '[object Object]' ||
      Object.prototype.toString(x) === '[object Function]')
  ) {
    try {
      const then = x.then;
      if (typeof then === 'function') {
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
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};
