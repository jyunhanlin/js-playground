/**
 * @param {string} s
 * @return {number}
 */
var numberOfWays = function (s) {
  const dp = new Map();

  const helper = (lastChar, len, i, res) => {
    if (i > s.length) return 0;

    const key = `${lastChar}-${len}-${i}`;

    if (dp.has(key)) return dp.get(key);

    if (len === 3) {
      return res + 1;
    } else {
      let temp = 0;
      if (lastChar !== s[i]) {
        temp += helper(s[i], len + 1, i + 1, res);
      }

      temp += helper(lastChar, len, i + 1, res);

      dp.set(key, temp);
      return temp;
    }
  };

  return helper('', 0, 0, 0);
};

var numberOfWays = function (s) {
  const n = s.length;

  let validWays = 0;

  let postFixOnes = 0;
  let postFixZeros = 0;

  for (let i = 0; i < n; ++i) {
    const bit = s.charAt(i);

    if (bit === '1') ++postFixOnes;
    else ++postFixZeros;
  }

  let prefixOnes = 0;
  let prefixZeros = 0;

  for (let i = 0; i < n; ++i) {
    const bit = s.charAt(i);

    if (bit === '1') {
      --postFixOnes;
      validWays += prefixZeros * postFixZeros;
      ++prefixOnes;
    } else {
      --postFixZeros;
      validWays += prefixOnes * postFixOnes;
      ++prefixZeros;
    }
  }

  return validWays;
};
