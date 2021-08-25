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
var inorderTraversal = function (root) {
  const result = [];

  helper(root, result);

  return result;
};

const helper = (cur, res) => {
  if (cur) {
    if (cur.left) {
      helper(cur.left, res);
    }
    res.push(cur.val);

    if (cur.right) {
      helper(cur.right, res);
    }
  }
};
