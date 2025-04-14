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
 * @param {number} limit
 * @return {TreeNode}
 */
var sufficientSubset = function (root, limit) {
  if (!root) return null;

  if (!root.left && !root.right) {
    if (root.val < limit) return null;
    return root;
  }

  const left = sufficientSubset(root.left, limit - root.val);
  const right = sufficientSubset(root.right, limit - root.val);

  if (!left && !right) return null;

  root.left = left;
  root.right = right;

  return root;
};
