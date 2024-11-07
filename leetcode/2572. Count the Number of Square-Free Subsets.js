/**
 * @param {number[]} nums
 * @return {number}
 */
var squareFreeSubsets = function (nums) {
  const MOD = 1e9 + 7;
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  const n = nums.length;
  const dp = new Array(n).fill().map(() => new Array());

  const getMask = (num) => {
    let mask = 0;
    for (let i = 0; i < primes.length; i += 1) {
      let primeCount = 0;
      while (num % primes[i] === 0) {
        primeCount += 1;
        num /= primes[i];
      }
      if (primeCount > 1) return -1;
      if (primeCount === 1) mask |= 1 << i;
    }
    return mask;
  };

  const helper = (index, mask) => {
    if (index === n) return 0;
    if (dp[index][mask]) return dp[index][mask];

    const newMask = getMask(nums[index]);
    let res = helper(index + 1, mask);
    if (newMask !== -1 && (mask & newMask) === 0) {
      res += 1;
      res += helper(index + 1, mask | newMask);
      res %= MOD;
    }
    return (dp[index][mask] = res);
  };

  return helper(0, 0);
};
