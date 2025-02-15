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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let res = 0;
  let rank = 0;

  const traverse = (node) => {
    if (!node) return;

    traverse(node.left);

    rank += 1;
    if (rank === k) {
      res = node.val;
      return;
    }

    traverse(node.right);
  };

  traverse(root);

  return res;
};
