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
var postorderTraversal = function (root) {
  if (!root) return [];

  const result = [];
  postorder(root, result);

  return result;
};

const postorder = (cur, result) => {
  if (!cur.left && !cur.right) {
    result.push(cur.val);
    return;
  }

  if (cur.left) {
    postorder(cur.left, result);
    cur.left = null;
  }
  if (cur.right) {
    postorder(cur.right, result);
    cur.right = null;
  }
  if (cur) postorder(cur, result);
};

// from discuss
const postorder = (cur, result) => {
  if (!cur) return;

  if (cur.left) postorder(cur.left, result);
  if (cur.right) postorder(cur.right, result);

  result.push(cur.val);
};
