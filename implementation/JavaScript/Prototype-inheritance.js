function Parent(name) {
  this.name = name;
  this.colors = ['red', 'yellow', 'green'];
}

Parent.prototype.getColors = function () {
  return this.colors;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');
console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors.push('aa'));
console.log(child1.getColors());
var child2 = new Child('daisy', '20');
console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.getColors());

/**
 * @param {object} child
 * @param {object} parent
 */
function inherit(child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      enumerable: false,
      configurable: true,
      writable: true,
      value: parent.constructor,
    },
  });

  Object.setPrototypeOf(childe, parent);
}

/**
 * @param {object} Child
 * @param {object} Parent
 */
function inherit2(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);

  Child.prototype.constructor = Child;

  Child.super = Parent;

  if (Object.setPrototypeOf) Object.setPrototypeOf(Child, parent);
  else if (Child.__proto__) Child.__proto__ = Parent;
  else {
    for (var k in Parent) {
      if (Parent.hasOwnProperty(k) && !(k in Child)) Child[k] = Parent[k];
    }
  }
}

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
