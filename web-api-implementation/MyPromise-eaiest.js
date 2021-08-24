/**
 * ref:
 * 1. https://juejin.cn/post/6844904094079926286
 */

function MyPromise(executor) {
  this.cbs = [];

  const resolve = (value) => {
    this.data = value;
    this.cbs.forEach((cb) => cb(value));
  };

  executor(resolve);
}

MyPromise.prototype.then = function (onResolved) {
  return new MyPromise((resolve) => {
    this.cbs.push(() => {
      setTimeout(() => {
        const res = onResolved(this.data);
        if (res instanceof MyPromise) {
          res.then(resolve);
        } else {
          resolve(res);
        }
      }, 0);
    });
  });
};

new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 500);
})
  .then((res) => {
    console.log(res);
    return new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, 500);
    });
  })
  .then(console.log);
