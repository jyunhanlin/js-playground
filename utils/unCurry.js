Function.prototype.unCurry = function () {
  const self = this;
  return function () {
    return Function.prototype.call.apply(self, arguments);
  };
};

Function.prototype.unCurry = function () {
  return this.call.bind(this);
};
