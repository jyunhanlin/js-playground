// refer to: https://leetcode.com/problems/filling-bookcase-shelves/discuss/1285914/JavaScript-DP-Bottom-Up-w-Comments

/**
 * @param {number[][]} books
 * @param {number} shelfWidth
 * @return {number}
 */
var minHeightShelves = function (books, shelfWidth) {
  const dp = new Array(books.length + 1).fill(0);

  for (let i = 0; i < books.length; i += 1) {
    let [curWidth, curHeight] = books[i];
    dp[i + 1] = dp[i] + curHeight;
    for (let j = i - 1; j >= 0; j -= 1) {
      const [preWidth, preHeight] = books[j];
      if (curWidth + preWidth > shelfWidth) break;
      curWidth += preWidth;
      curHeight = Math.max(curHeight, preHeight);
      dp[i + 1] = Math.min(dp[i + 1], dp[j] + curHeight);
    }
  }

  return dp[books.length];
};
