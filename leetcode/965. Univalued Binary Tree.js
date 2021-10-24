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
var isUnivalTree = function (root) {
  const result = [];
  const traversal = (cur) => {
    if (cur) result.push(cur.val);
    cur.left && traversal(cur.left);
    cur.right && traversal(cur.right);
  };

  traversal(root);

  return new Set([...result]).size === 1;
};

var isUnivalTree = function (root, value = root.val) {
  if (!root) {
    return true;
  }

  if (root.val !== value) {
    return false;
  }

  return isUnivalTree(root.left, value) && isUnivalTree(root.right, value);
};
