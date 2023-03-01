export function once(fn) {
  let count = 0;
  return function (...args) {
    if (count === 0) {
      count += 1;
      return fn(...args);
    }
  };
}

export function curry(func) {
  const len = func.length;
  function partial(func, argsList, argsLen) {
    if (argsList.length >= argsLen) {
      return func(...argsList);
    }

    return function (...args) {
      return partial(func, [...argsList, ...args], argsLen);
    };
  }

  return partial(func, [], len);
}

export function pipe(...fns) {
  return function (...args) {
    return fns.reduce((prevResult, fn) => fn(...prevResult), args);
  };
}

export function compose(...fns) {
  return function (...args) {
    return fns.reduceRight((prevResult, fn) => fn(...prevResult), args);
  };
}
