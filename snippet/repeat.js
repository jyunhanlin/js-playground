function repeat(fn, times, delay) {
  return async function (...args) {
    for (let i = 0; i < times; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          fn.call(this, ...args);
          resolve();
        }, delay);
      });
    }
  };
}
const repeatFn = repeat(console.log, 4, 1000);
repeatFn('hello');
