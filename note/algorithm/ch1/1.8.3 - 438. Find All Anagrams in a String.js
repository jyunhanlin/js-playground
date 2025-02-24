/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const need = {};
  const window = {};

  let validSize = 0;
  for (let i = 0; i < p.length; i += 1) {
    const c = p[i];
    if (!need[c]) {
      validSize += 1;
      need[c] = 1;
    } else need[c] += 1;
  }

  let left = 0;
  let right = 0;
  let valid = 0;
  let res = [];

  while (right < s.length) {
    const c = s[right++];

    if (need[c]) {
      if (!window[c]) window[c] = 1;
      else window[c] += 1;

      if (window[c] === need[c]) valid += 1;
    }

    while (right - left >= p.length) {
      if (valid === validSize) res.push(left);

      const d = s[left++];
      if (need[d]) {
        if (window[d] === need[d]) valid -= 1;
        window[d] -= 1;
      }
    }
  }

  return res;
};
