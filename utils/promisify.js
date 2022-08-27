// Takes a function following the common error-first callback style
// i.e. taking an (err, value) => ... callback as the last argument, and returns a version that returns promises.
function promisify(original) {
  function fn(...args) {
    return new Promise((resolve, reject) => {
      args.push((err, ...values) => {
        if (err) {
          return reject(err);
        }
        resolve(values);
      });
      // original.apply(this, args);
      Reflect.apply(original, this, args);
    });
  }
  return fn;
}
