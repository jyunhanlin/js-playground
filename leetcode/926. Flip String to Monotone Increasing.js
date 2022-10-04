/**
 * @param {string} s
 * @return {number}
 */
var minFlipsMonoIncr = function (s) {
  let count1 = 0;
  let res = 0;

  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === '0') {
      res = Math.min(res + 1, count1);
    } else {
      count1 += 1;
    }
  }

  return res;
};
