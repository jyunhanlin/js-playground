/**
 * @param {string} s
 * @param {string} chars
 * @param {number[]} vals
 * @return {number}
 */
var maximumCostSubstring = function (s, chars, vals) {
  const charValues = {};
  for (let i = 0; i < chars.length; i += 1) {
    charValues[chars[i]] = vals[i];
  }

  for (let i = 97; i <= 122; i += 1) {
    if (!charValues[String.fromCharCode(i)]) {
      charValues[String.fromCharCode(i)] = i - 96;
    }
  }
  let sum = 0;
  let tempSum = 0;
  for (let i = 0; i < s.length; i += 1) {
    tempSum += charValues[s[i]];
    tempSum = Math.max(0, tempSum);
    sum = Math.max(sum, tempSum);
  }
  return sum;
};
