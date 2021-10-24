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
var findSecondMinimumValue = function (root) {
  let path = [];

  const traversal = (cur) => {
    cur.left && traversal(cur.left);
    path.push(cur.val);
    cur.right && traversal(cur.right);
  };

  traversal(root);

  path = [...new Set([...path])];
  path.sort((a, b) => a - b);

  return path.length === 1 ? -1 : [...path][1];
};
