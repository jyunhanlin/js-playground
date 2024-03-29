Function.prototype.apply = function (context) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
};
