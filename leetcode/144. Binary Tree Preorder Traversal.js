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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  const result = [];

  preorder(root, result);

  return result;
};

const preorder = (cur, result) => {
  if (!cur) return;
  if (cur) result.push(cur.val);

  if (cur.left) preorder(cur.left, result);
  if (cur.right) preorder(cur.right, result);
};
