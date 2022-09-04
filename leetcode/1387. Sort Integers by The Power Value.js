/**
 * @param {number} lo
 * @param {number} hi
 * @param {number} k
 * @return {number}
 */
var getKth = function (lo, hi, k) {
  const mem = new Map();
  mem.set(1, 0);

  const getter = (num) => {
    if (mem.has(num)) return mem.get(num);

    mem.set(num, getter(num % 2 === 0 ? num / 2 : 3 * num + 1) + 1);

    return mem.get(num);
  };

  const res = [];

  for (let i = lo; i <= hi; i += 1) {
    res.push(i);
  }

  res.sort((a, b) => getter(a) - getter(b));

  return res[k - 1];
};

const memo = new Map();
memo.set(1, 0);
memo.set(2, 1);

/**
 * @param {number} x
 * @return {number}
 */
const power = (x) => {
  if (memo.has(x)) {
    return memo.get(x);
  }
  memo.set(x, 1 + power(x % 2 === 0 ? parseInt(x / 2) : 3 * x + 1));
  return memo.get(x);
};

/**
 * @param {number} lo
 * @param {number} hi
 * @param {number} k
 * @return {number}
 */
var getKth = function (lo, hi, k) {
  const arr = [];
  for (let x = lo; x <= hi; x++) {
    arr.push(x);
  }
  arr.sort((a, b) => {
    if (power(a) === power(b)) {
      return a > b ? 1 : -1;
    }
    return power(a) > power(b) ? 1 : -1;
  });
  return arr[k - 1];
};
