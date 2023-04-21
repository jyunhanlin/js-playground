function pipe(...fns) {
  return function (...args) {
    return fns.reduce((prevResult, fn) => fn(...prevResult), args);
  };
}
