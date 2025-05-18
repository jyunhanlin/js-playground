/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const MAX = 2 ** 31 - 1;
  const n = s.length;

  let i = 0;
  let sign = 1;

  let res = 0;

  while (i < n && s[i] === ' ') {
    i += 1;
  }

  if (i === n) return 0;

  if (s[i] === '-') {
    sign = -1;
    i += 1;
  } else if (s[i] === '+') i += 1;

  if (i === n) return 0;

  while (i < n && '0' <= s[i] && s[i] <= '9') {
    res = res * 10 + (s[i] - '0');
    if (res > MAX) break;
    i += 1;
  }

  if (res > MAX) return sign === 1 ? MAX : -MAX - 1;

  return res * sign;
};
