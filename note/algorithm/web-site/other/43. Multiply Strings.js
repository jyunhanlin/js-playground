/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  const m = num1.length;
  const n = num2.length;

  const res = new Array(m + n).fill(0);

  for (let i = m - 1; i >= 0; i -= 1) {
    for (let j = n - 1; j >= 0; j -= 1) {
      const mul = +num1[i] * +num2[j];

      const p1 = i + j;
      const p2 = i + j + 1;

      const sum = mul + res[p2];
      res[p2] = sum % 10;
      res[p1] += Math.floor(sum / 10);
    }
  }

  while (res[0] === 0 && res.length > 1) res.shift();

  return res.join('');
};
