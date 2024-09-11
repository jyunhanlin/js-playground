/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} horizontalCut
 * @param {number[]} verticalCut
 * @return {number}
 */
var minimumCost = function (m, n, horizontalCut, verticalCut) {
  const dp = {};

  const helper = (start, endI, startJ, endJ) => {
    if (endI - start === 1 && endJ - startJ === 1) return 0;
    const key = `${start}-${endI}-${startJ}-${endJ}`;

    if (dp[key]) return dp[key];

    let min = Infinity;

    for (let i = start + 1; i < endI; i += 1) {
      min = Math.min(
        min,
        helper(start, i, startJ, endJ) + helper(i, endI, startJ, endJ) + horizontalCut[i - 1]
      );
    }

    for (let j = startJ + 1; j < endJ; j += 1) {
      min = Math.min(
        min,
        helper(start, endI, startJ, j) + helper(start, endI, j, endJ) + verticalCut[j - 1]
      );
    }

    dp[key] = min;

    return min;
  };

  return helper(0, m, 0, n);
};
