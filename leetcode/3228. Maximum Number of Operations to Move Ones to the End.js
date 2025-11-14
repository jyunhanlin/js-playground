/** Greedy
 * @param {string} s
 * @return {number}
 */
var maxOperations = function (s) {
  let countOne = 0;
  let ans = 0;
  let i = 0;
  while (i < s.length) {
    if (s[i] === '0') {
      while (i + 1 < s.length && s[i + 1] === '0') {
        i += 1;
      }
      ans += countOne;
    } else {
      countOne++;
    }
    i++;
  }
  return ans;
};

/** Time Limit Exceeded
 * @param {string} s
 * @return {number}
 */
var maxOperations = function (s) {
  let result = 0;
  const zeroCount = s.split('').filter((c) => c === '0').length;

  const finalString = [
    ...new Array(zeroCount).fill('0'),
    ...new Array(s.length - zeroCount).fill('1'),
  ].join('');

  let tempS = s;

  while (tempS !== finalString) {
    const i = tempS.indexOf('10');

    let j = i + 1;
    while (j < s.length && tempS[j] === '0') j += 1;

    let chars = tempS.split('');
    [chars[i], chars[j - 1]] = [chars[j - 1], chars[i]]; // ['d', 'o', 'r', 'l', 'w']

    tempS = chars.join('');

    result += 1;
  }

  return result;
};
