/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const window = {};

  let left = 0;
  let right = 0;
  let max = 0;

  while (right < s.length) {
    const c = s[right++];

    if (!window[c]) {
      window[c] = 1;
      max = Math.max(max, right - left);
    } else window[c] += 1;

    while (window[c] > 1) {
      const d = s[left++];
      window[d] -= 1;
    }
  }

  return max;
};
