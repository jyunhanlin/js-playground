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
var minDiffInBST = function (root) {
  const inorder = [];

  const inorderTraversal = (cur) => {
    cur.left && inorderTraversal(cur.left);
    inorder.push(cur.val);
    cur.right && inorderTraversal(cur.right);
  };

  inorderTraversal(root);

  let min = Infinity;
  for (let i = 0; i < inorder.length - 1; i += 1) {
    min = Math.min(min, inorder[i + 1] - inorder[i]);
  }

  return min;
};
