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
var generateTrees = function (n) {
  const build = (lo, hi) => {
    const res = [];
    if (lo > hi) {
      res.push(null);
      return res;
    }

    for (let i = lo; i <= hi; i += 1) {
      const leftTree = build(lo, i - 1);
      const rightTree = build(i + 1, hi);

      for (let left of leftTree) {
        for (let right of rightTree) {
          let root = new TreeNode(i);
          root.left = left;
          root.right = right;
          res.push(root);
        }
      }
    }

    return res;
  };

  return build(1, n);
};
