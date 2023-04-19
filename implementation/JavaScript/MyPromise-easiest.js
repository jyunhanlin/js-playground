function MyPromise(executor) {
  this.cbs = [];

  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;
      this.cbs.forEach((cb) => cb(value));
    }, 0);
  };

  executor(resolve);
}

MyPromise.prototype.then = function (onFulfilled) {
  return new MyPromise((resolve) => {
    this.cbs.push(() => {
      setTimeout(() => {
        const res = onFulfilled(this.data);
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
