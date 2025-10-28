function compose(...fns) {
  return function (...args) {
    return fns.reduceRight((prevResult, fn) => fn(...prevResult), args);
  };
}

function pipe(...fns) {
  return function (...args) {
    return fns.reduce((prevResult, fn) => fn(...prevResult), args);
  };
}

function curry(fn) {
  return function (...args) {
    return fn.length === args.length ? fn(...args) : (...args2) => curry(fn)(...args, ...args2);
  };
}

// ============ Examples ============

// compose: right to left (g(f(x)))
const add = (x) => x + 1;
const multiply = (x) => x * 2;
const square = (x) => x * x;

const composedFn = compose(square, multiply, add);
console.log(composedFn(5)); // square(multiply(add(5))) = square(12) = 144

// pipe: left to right (more natural reading order)
const pipedFn = pipe(add, multiply, square);
console.log(pipedFn(5)); // square(multiply(add(5))) = square(12) = 144

// Real-world pipe example
const trim = (str) => str.trim();
const toLowerCase = (str) => str.toLowerCase();
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const normalizeString = pipe(trim, toLowerCase, capitalize);
console.log(normalizeString('  hello WORLD  ')); // "Hello world"

// curry: partial application
const sum3 = (a, b, c) => a + b + c;
const curriedSum = curry(sum3);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6

// curry practical example: reusable config
const greet = (greeting, name, punctuation) => `${greeting}, ${name}${punctuation}`;
const curriedGreet = curry(greet);

const sayHello = curriedGreet('Hello');
const sayHelloToJohn = sayHello('John');

console.log(sayHelloToJohn('!')); // "Hello, John!"
console.log(sayHelloToJohn('.')); // "Hello, John."
console.log(sayHello('Jane')('!')); // "Hello, Jane!"
