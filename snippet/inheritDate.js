// after transpiler, the following code might fail
class DateConstructor extends Date {
  constructor() {
    super();
  }

  getMyTime() {
    return this.getTime();
  }
}

// use the following code
function DateConstructor() {
  var dateObj = new (Function.prototype.bind.apply(
    Date,
    [Date].concat(Array.prototype.slice.call(arguments))
  ))();

  Object.setPrototypeOf(dateObj, DateConstructor.prototype);

  return dateObj;
}

Object.setPrototypeOf(DateConstructor.prototype, Date.prototype);

DateConstructor.prototype.getMyTime = function () {
  return this.getTime();
};
