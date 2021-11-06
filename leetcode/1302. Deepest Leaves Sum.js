/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var deepestLeavesSum = function (root) {
  let max = 0;
  let acc = 0;

  const dfs = (cur, depth) => {
    if (cur && !cur.left && !cur.right) {
      const curDepth = depth + 1;
      if (curDepth > max) {
        acc = cur.val;
        max = curDepth;
      } else if (curDepth === max) {
        acc += cur.val;
      }
    }

    cur.left && dfs(cur.left, depth + 1);
    cur.right && dfs(cur.right, depth + 1);
  };

  dfs(root, 0);

  return acc;
};
