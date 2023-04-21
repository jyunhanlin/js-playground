function compose(...fns) {
  return function (...args) {
    return fns.reduceRight((prevResult, fn) => fn(...prevResult), args);
  };
}
