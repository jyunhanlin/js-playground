/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var allPossibleFBT = function (n) {
  if (n % 2 === 0) return [];

  const memo = new Array(n + 1);

  const build = (n) => {
    if (n === 1) return [new TreeNode(0)];

    if (memo[n]) return memo[n];

    const res = [];
    for (let i = 1; i < n; i += 2) {
      const leftTrees = build(i);
      const rightTrees = build(n - i - 1);

      for (const left of leftTrees) {
        for (const right of rightTrees) {
          const root = new TreeNode(0);
          root.left = left;
          root.right = right;
          res.push(root);
        }
      }
    }
    memo[n] = res;
    return res;
  };

  return build(n);
};
