/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
  if (!nums.length) return null;
  if (nums.length === 1) return new TreeNode(nums[0]);

  const max = Math.max(...nums);
  const maxIdx = nums.indexOf(max);

  const root = new TreeNode(max);

  root.left = constructMaximumBinaryTree(nums.slice(0, maxIdx));
  root.right = constructMaximumBinaryTree(nums.slice(maxIdx + 1));

  return root;
};
