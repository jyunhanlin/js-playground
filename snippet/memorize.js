// ref: https://parthasarma.hashnode.dev/memoization-in-javascript

const myMemoize = function (fn) {
  let res = {};
  return function (...args) {
    let values = JSON.stringify(args);
    if (!res[values]) {
      res[values] = fn(...args);
    }
    return res[values];
  };
};

const memoizeProduct = myMemoize(slowProduct);

function slowProduct(num1, num2) {
  for (let i = 0; i <= 100000000; i++) {}
  return num1 * num2;
}

console.time('first call');
console.log(memoizeProduct(192, 192));
console.timeEnd('first call');

console.time('second call');
console.log(memoizeProduct(192, 192));
console.timeEnd('second call');
