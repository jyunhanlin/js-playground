/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const sObj = {};

  for (let i = 0; i < s.length; i += 1) {
    if (sObj[s[i]]) sObj[s[i]] += 1;
    else sObj[s[i]] = 1;
  }

  for (let i = 0; i < t.length; i += 1) {
    if (sObj[t[i]]) {
      sObj[t[i]] -= 1;
    } else {
      return false;
    }

    if (sObj[t[i]] < 0) return false;
  }

  return true;
};
