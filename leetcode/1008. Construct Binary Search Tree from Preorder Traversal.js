/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
  if (!preorder.length) return null;

  const root = new TreeNode(preorder[0]);

  root.left = bstFromPreorder(preorder.filter((val) => val < root.val));
  root.right = bstFromPreorder(preorder.filter((val) => val > root.val));

  return root;
};
