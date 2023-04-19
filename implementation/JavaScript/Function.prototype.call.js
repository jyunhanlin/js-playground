Function.prototype.call2 = function (context) {
  var context = context || window;

  context.fn = this;

  var args = [...arguments].slice(1);

  var result = context.fn(...args);

  delete context.fn;
  return result;
};
