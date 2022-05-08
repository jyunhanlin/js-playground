/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const result = new Set();

  const recursive = (cur, leftCount, rightCount) => {
    if (leftCount <= n && rightCount <= n) {
      if (leftCount === n && rightCount === n) {
        result.add(cur);
      } else if (leftCount >= rightCount) {
        if (leftCount === rightCount) {
          recursive(cur + '(', leftCount + 1, rightCount);
        } else {
          recursive(cur + '(', leftCount + 1, rightCount);
          recursive(cur + ')', leftCount, rightCount + 1);
        }
      }
    }
  };

  recursive('', 0, 0);

  return [...result];
};
