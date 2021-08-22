/**
 * ref:
 * 1. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof
 * 2. https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/javascript-instanceof-operator-implementation-ee8f40f9e3b6
 */

function myInstanceof(objA, objB) {
  const objBProto = objB.prototype;
  let objAProto = Object.getPrototypeOf(objA);

  while (objAProto) {
    if (objAProto === objBProto) return true;

    objAProto = Object.getPrototypeOf(objAProto);
  }

  return false;
}
