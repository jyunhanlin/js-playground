Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  var _this = this;
  var args = [...arguments].slice(1);
  // 返回一個函數
  return function F() {
    // 因為返回了一個函數，我們可以 new F()，所以需要判斷
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};
