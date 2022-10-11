function curry(fn) {
  if (fn.length <= 1) return fn;
  const gen = (...args) => {
    if (fn.length === args.length) return fn(...args);
    else return (...args2) => gen(...args, ...args2);
  };
}
