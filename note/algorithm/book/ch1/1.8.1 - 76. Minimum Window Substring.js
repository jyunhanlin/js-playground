/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const need = {};
  const window = {};

  let validSize = 0;
  for (let i = 0; i < t.length; i += 1) {
    const c = t[i];
    if (!need[c]) {
      validSize += 1;
      need[c] = 1;
    } else need[c] += 1;
  }

  let left = 0;
  let right = 0;
  let valid = 0;
  let start = 0;
  let len = Infinity;

  while (right < s.length) {
    const c = s[right++];

    if (need[c]) {
      if (!window[c]) window[c] = 1;
      else window[c] += 1;

      if (window[c] === need[c]) valid += 1;
    }

    while (valid === validSize) {
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      const d = s[left++];
      if (need[d]) {
        if (window[d] === need[d]) valid -= 1;
        window[d] -= 1;
      }
    }
  }

  return len === Infinity ? '' : s.substr(start, len);
};
