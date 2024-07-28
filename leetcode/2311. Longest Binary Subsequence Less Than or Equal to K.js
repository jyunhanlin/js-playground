/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubsequence = function (s, k) {
  // greedy
  let count = 0;
  let acc = 0;
  let j = 0;

  for (let i = s.length - 1; i >= 0; i -= 1) {
    const current = Number(s[i] * Math.pow(2, j));
    j += 1;

    if (acc + current > k) continue;
    acc += current;
    count += 1;
  }

  return count;
};
