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
 * @return {TreeNode}
 */
var increasingBST = function (root) {
  const inorder = [];

  const inorderTraversal = (cur) => {
    cur.left && inorderTraversal(cur.left);
    inorder.push(cur.val);
    cur.right && inorderTraversal(cur.right);
  };
  inorderTraversal(root);
  const newRoot = new TreeNode(inorder.shift());
  let cur = newRoot;

  while (inorder.length) {
    cur.right = new TreeNode(inorder.shift());
    cur = cur.right;
  }

  return newRoot;
};
