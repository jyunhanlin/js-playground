/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  const need = {};
  const window = {};

  let validSize = 0;
  for (let i = 0; i < s1.length; i += 1) {
    const c = s1[i];
    if (!need[c]) {
      validSize += 1;
      need[c] = 1;
    } else need[c] += 1;
  }

  let left = 0;
  let right = 0;
  let valid = 0;

  while (right < s2.length) {
    const c = s2[right++];

    if (need[c]) {
      if (!window[c]) window[c] = 1;
      else window[c] += 1;

      if (window[c] === need[c]) valid += 1;
    }

    while (right - left >= s1.length) {
      if (valid === validSize) return true;

      const d = s2[left++];
      if (need[d]) {
        if (window[d] === need[d]) valid -= 1;
        window[d] -= 1;
      }
    }
  }

  return false;
};
