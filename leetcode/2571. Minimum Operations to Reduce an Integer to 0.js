/**
 * @param {number} n
 * @return {number}
 */
var minOperations = function (n) {
  let res = 0;
  let num = n;
  while (num > 0) {
    res += 1;
    const sqrt = Math.ceil(Math.sqrt(num));
    let minDis = Infinity;
    for (let i = 0; i <= sqrt; i += 1) {
      const power = 2 ** i;
      if (minDis > Math.abs(num - power)) {
        minDis = Math.abs(num - power);
      }
    }

    num = minDis;
  }

  return res;
};

var minOperations = function (n) {
  let res = 0;
  const helper = (num) => {
    if (num <= 0) return;

    res += 1;

    const sqrt = Math.ceil(Math.sqrt(num));
    let minDis = Infinity;
    for (let i = 0; i <= sqrt; i += 1) {
      const power = 2 ** i;
      if (minDis > Math.abs(num - power)) {
        minDis = Math.abs(num - power);
      }
    }

    helper(minDis);
  };

  helper(n);
  return res;
};
