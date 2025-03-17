/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  const n = s.length;
  let left = 0;
  let right = 0;

  let winCount = 0;
  let winCountMap = {};

  let res = 0;

  while (right < n) {
    const c = s[right];
    winCountMap[c] = (winCountMap[c] || 0) + 1;
    winCount = Math.max(winCount, winCountMap[c]);
    right += 1;

    while (right - left - winCount > k) {
      winCountMap[s[left]] -= 1;
      left += 1;
    }

    res = Math.max(res, right - left);
  }
  return res;
};
