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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function (root) {
  let first = null;
  let second = null;

  let prev = new TreeNode(-Infinity);

  const traversal = (node) => {
    if (!node) return;

    traversal(node.left);

    if (prev.val > node.val) {
      if (!first) first = prev;
      second = node;
    }
    prev = node;

    traversal(node.right);
  };

  traversal(root);

  if (first && second) [first.val, second.val] = [second.val, first.val];
};
