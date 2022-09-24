/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles) {
  const length = piles.length;
  const dp = new Array(length + 1).fill(0).map((_) => new Array(length + 1).fill(0));
  const sufsum = new Array(length + 1).fill(0);
  for (let i = length - 1; i >= 0; i--) {
    sufsum[i] = sufsum[i + 1] + piles[i];
  }
  for (let i = 0; i <= length; i++) {
    dp[i][length] = sufsum[i];
  }
  for (let i = length - 1; i >= 0; i--) {
    for (let j = length - 1; j >= 1; j--) {
      for (let X = 1; X <= 2 * j && i + X <= length; X++) {
        dp[i][j] = Math.max(dp[i][j], sufsum[i] - dp[i + X][Math.max(j, X)]);
      }
    }
  }
  return dp[0][1];
};

/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles) {
  const len = piles.length;
  const mem = {};
  const sums = new Array(len).fill(0);
  sums[len - 1] = piles[len - 1];

  for (let i = len - 2; i >= 0; i--) {
    sums[i] = sums[i + 1] + piles[i];
  }

  const helper = (index, M) => {
    const key = `${index}-${M}`;

    if (len - index <= 2 * M) return sums[index];
    if (mem[key]) return mem[key];

    let res = 0;

    for (let x = 1; x <= 2 * M; x += 1) {
      const newM = Math.max(x, M);
      res = Math.max(res, sums[index] - helper(index + x, newM));
    }

    mem[key] = res;
    return res;
  };

  return helper(0, 1);
};
