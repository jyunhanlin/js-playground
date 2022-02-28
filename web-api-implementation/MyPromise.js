/**
 * ref:
 * 1. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * 2. https://segmentfault.com/a/1190000039699000
 * 3. https://juejin.cn/post/6850037281206566919
 *
 */

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
