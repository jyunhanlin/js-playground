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
