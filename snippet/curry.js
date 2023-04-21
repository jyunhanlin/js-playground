function curry(fn) {
  if (fn.length <= 1) return fn;
  const gen = (...args) => {
    if (fn.length === args.length) return fn(...args);
    else return (...args2) => gen(...args, ...args2);
  };
}

function curry(func) {
  const len = func.length;
  function partial(func, argsList, argsLen) {
    if (argsList.length >= argsLen) {
      return func(...argsList);
    }

    return function (...args) {
      return partial(func, [...argsList, ...args], argsLen);
    };
  }
}
