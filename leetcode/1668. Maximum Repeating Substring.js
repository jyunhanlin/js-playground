/**
 * @param {string} sequence
 * @param {string} word
 * @return {number}
 */
var maxRepeating = function (sequence, word) {
  const sLen = sequence.length;
  const wLen = word.length;
  const dp = new Array(sLen).fill(0);

  for (let i = 0; i < sLen; i += 1) {
    if (i + wLen <= sLen) {
      const seqWord = sequence.substring(i, i + wLen);

      if (seqWord === word) dp[i + wLen - 1] = 1 + (dp[i - 1] || 0);
    }
  }

  return Math.max(...dp);
};

/**
 * @param {string} sequence
 * @param {string} word
 * @return {number}
 */
var maxRepeating = function (sequence, word) {
  let k = 0;

  while (sequence.includes(word.repeat(k + 1))) {
    k += 1;
  }
  return k;
};
