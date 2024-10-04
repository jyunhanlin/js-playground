/**
 * @param {string} s
 * @return {number}
 */
var minimumSubstringsInPartition = function (s) {
  const n = s.length;
  const dp = new Array(n).fill(n);

  for (let i = 0; i < n; i += 1) {
    const charFreq = new Array(26).fill(0);
    for (let j = i; j >= 0; j -= 1) {
      charFreq[s.charCodeAt(j) - 'a'.charCodeAt(0)]++;
      if (isBalanced(charFreq)) {
        dp[i] = j > 0 ? Math.min(dp[i], dp[j - 1] + 1) : 1;
      }
    }
  }

  return dp[n - 1];
};

const isBalanced = (charFreq) => {
  let minFreq = 1001,
    maxFreq = 0;
  for (let Freq of charFreq) {
    if (Freq > 0) {
      minFreq = Math.min(minFreq, Freq);
      maxFreq = Math.max(maxFreq, Freq);
    }
  }
  return minFreq === maxFreq;
};
