/**
 * @param {string} s
 * @return {number}
 */
var minimumBeautifulSubstrings = function (s) {
  if (s[0] === '0') return -1;
  const dp = new Array(s.length + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === '0') continue;

    let num = 0;
    for (let j = i; j < s.length; j += 1) {
      num = (num << 1) + +s[j];
      if (isPowerOf5(num)) {
        dp[j + 1] = Math.min(dp[j + 1], dp[i] + 1);
      }
    }
  }
  return dp[s.length] !== Infinity ? dp[s.length] : -1;
};

function isPowerOf5(num) {
  while (num > 1 && num % 5 === 0) num /= 5;
  return num === 1;
}
