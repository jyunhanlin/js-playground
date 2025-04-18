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
var getMinimumDifference = function (root) {
  let res = Infinity;
  let prev = null;

  const traverse = (node) => {
    if (!node) return;

    traverse(node.left);

    if (prev) {
      res = Math.min(res, Math.abs(prev.val - node.val));
    }

    prev = node;
    traverse(node.right);
  };

  traverse(root);

  return res;
};
