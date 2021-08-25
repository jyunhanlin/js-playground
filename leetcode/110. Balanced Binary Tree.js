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
 * @return {boolean}
 */
var isBalanced = function (root) {
  if (!root) return true;

  return getHeight(root) !== Infinity;
};

const getHeight = (cur) => {
  if (!cur) return 0;

  let left = 1 + getHeight(cur.left);
  let right = 1 + getHeight(cur.right);

  if (Math.abs(left - right) > 1) return Infinity;

  return Math.max(left, right);
};

var isBalanced = function (root) {
  if (!root) return true;
  return (
    isBalanced(root.left) &&
    isBalanced(root.right) &&
    Math.abs(getHeight(root.left) - getHeight(root.right)) < 2
  );
};

function getHeight(node) {
  if (node === null) return 0;
  return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}
