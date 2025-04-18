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

  const rightTreeIndex = preorder.findIndex((n) => n > preorder[0]);

  if (rightTreeIndex !== -1) {
    root.left = bstFromPreorder(preorder.slice(1, rightTreeIndex));
    root.right = bstFromPreorder(preorder.slice(rightTreeIndex));
  } else root.left = bstFromPreorder(preorder.slice(1));

  return root;
};
