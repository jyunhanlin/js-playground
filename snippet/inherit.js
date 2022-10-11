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
