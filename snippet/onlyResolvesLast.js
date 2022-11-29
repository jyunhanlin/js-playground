function onlyResolvesLast(fn) {
  let id = 0;

  const wrappedFn = (...args) => {
    const fetchId = id + 1;
    id = fetchId;

    const result = fn.apply(this, args);

    return new Promise((resolve, reject) => {
      Promise.resolve(result).then(
        (value) => {
          if (fetchId === id) {
            resolve(value);
          }
        },
        (error) => {
          if (fetchId === id) {
            reject(error);
          }
        }
      );
    });
  };

  return wrappedFn;
}
