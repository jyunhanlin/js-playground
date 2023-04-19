const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        setTimeout(() => {
          this.status = FULFILLED;
          this.value = value;
          this.onResolvedCallbacks.forEach((fn) => fn());
        });
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        setTimeout(() => {
          this.status = REJECTED;
          this.reason = reason;
          this.onRejectedCallbacks.forEach((fn) => fn());
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const fulfilled = setTimeout(() => {
        const res = onFulfilled(this.value);
        if (res instanceof MyPromise) {
          res.then(resolve);
        } else {
          resolve(res);
        }
      });

      const rejected = setTimeout(() => {
        const res = onRejected(this.reason);
        reject(res);
      });

      if (this.status === FULFILLED) {
        fulfilled();
      }

      if (this.status === REJECTED) {
        rejected();
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(fulfilled);

        this.onRejectedCallbacks.push(rejected);
      }
    });
  }
}
