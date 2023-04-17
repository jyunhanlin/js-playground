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
      if (this.status === FULFILLED) {
        setTimeout(() => {
          onFulfilled(this.value);
        });
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          onRejected(this.reason);
        });
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(
          setTimeout(() => {
            onFulfilled(this.value);
          })
        );

        this.onRejectedCallbacks.push(
          setTimeout(() => {
            onRejected(this.reason);
          })
        );
      }
    });
  }
}
