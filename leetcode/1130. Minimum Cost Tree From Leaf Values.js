/**
 * @param {number[]} arr
 * @return {number}
 */
var mctFromLeafValues = function (arr) {
  const dp = new Array(arr.length).fill(0).map(() => new Array(arr.length).fill(0));

  const buildTree = (start, end) => {
    if (start === end) return 0;
    if (dp[start][end]) return dp[start][end];

    let min = Infinity;
    for (let i = start; i < end; i += 1) {
      const left = buildTree(start, i);
      const right = buildTree(i + 1, end);

      const maxLeft = Math.max(...arr.slice(start, i + 1));
      const maxRight = Math.max(...arr.slice(i + 1, end + 1));

      min = Math.min(min, rootVal + left + right + maxLeft * maxRight);
    }

    dp[start][end] = min;
    return min;
  };

  return buildTree(0, arr.length - 1);
};
