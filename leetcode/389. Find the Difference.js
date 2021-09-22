/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  const obj = {};

  for (let i = 0; i < s.length; i += 1) {
    const c = s[i];
    if (!obj[c]) obj[c] = 1;
    else obj[c]++;
  }

  for (let i = 0; i < t.length; i += 1) {
    const c = t[i];

    if (!obj[c]) return c;
    obj[c] -= 1;

    if (obj[c] < 0) return c;
  }
};

/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  const sum1 = s.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
  const sum2 = t.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
  return String.fromCharCode(sum2 - sum1);
};
