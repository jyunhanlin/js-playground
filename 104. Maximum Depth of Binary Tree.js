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
var maxDepth = function (root) {
  if (!root) return 0;

  return checkChild(root, 0);
};

const checkChild = (node, depth) => {
  if (!node) return depth;

  return Math.max(checkChild(node.left, depth + 1), checkChild(node.right, depth + 1));
};
