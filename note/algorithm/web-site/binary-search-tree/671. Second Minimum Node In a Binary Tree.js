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
var findSecondMinimumValue = function (root) {
  if (!root.left && !root.right) return -1;

  let left = root.left.val;
  let right = root.right.val;

  if (root.val === left) left = findSecondMinimumValue(root.left);

  if (root.val === right) right = findSecondMinimumValue(root.right);

  if (left === -1) return right;
  if (right === -1) return left;

  return Math.min(left, right);
};
