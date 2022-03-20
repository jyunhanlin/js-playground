/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const result = [];

  for (let i = 0; i <= n; i += 1) {
    result.push(Number(i).toString(2).replace(/0/g, '').length);
  }

  return result;
};

// dp
const countBits = (n) => {
  let result = Array(n + 1).fill(0);
  let offset = 1;
  for (let i = 1; i < n + 1; i++) {
    if (offset * 2 === i) {
      offset = i;
    }
    result[i] = 1 + result[i - offset];
  }

  return result;
};
