function type(x) {
  const t = typeof x;

  if (x === null) {
    return 'null';
  }

  if (t !== 'object') {
    return t;
  }

  const toString = Object.prototype.toString;
  const innerType = toString.call(x).slice(8, -1);
  const innerLowType = innerType.toLowerCase();

  if (['String', 'Boolean', 'Number'].includes(innerType)) {
    return innerType;
  }

  // function A() {}; new A
  if (innerLowType === 'object' && typeof x?.constructor?.name === 'string') {
    return x.constructor.name !== innerType ? x.constructor.name : innerLowType;
  }

  return innerLowType;
}

console.log(type(undefined)); // undefined
console.log(type(null)); // null
console.log(type(true)); // boolean
console.log(type(new Boolean(true))); // Boolean
console.log(type(1)); // number
console.log(type(new Number(1))); // Number
console.log(type('')); // string
console.log(type(new String(''))); // String
console.log(type(Symbol())); // symbol
console.log(type({})); // object
console.log(type([])); // array
console.log(type(/a/)); // regexp
console.log(type(Math)); // math

function A() {}
console.log(type(new A())); // A
