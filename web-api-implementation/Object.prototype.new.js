function newFunc(constructor, ...args) {
  const obj = Object.create(constructor.prototype);

  const result = constructor.apply(obj, args);

  return typeof result === 'object' && result != null ? result : obj;
}
