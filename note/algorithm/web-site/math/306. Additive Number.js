/**
 * @param {string} num
 * @return {boolean}
 */
var isAdditiveNumber = function (num) {
  const n = num.length;

  const isValid = (start, first, second) => {
    if (
      (first.startsWith('0') && first.length > 1) ||
      (second.startsWith('0') && second.length > 1)
    ) {
      return false;
    }

    let sumStr = `${+first + +second}`;
    const next = num.substring(start + first.length + second.length);

    if (!next.startsWith(sumStr)) {
      return false;
    }
    if (next === sumStr) {
      return true;
    }

    return isValid(start + first.length, second, sumStr);
  };

  for (let i = 1; i <= n; i += 1) {
    const first = num.substring(0, i);

    for (let j = i + 1; j <= n; j += 1) {
      const second = num.substring(i, j);
      if (isValid(0, first, second)) return true;
    }
  }

  return false;
};
