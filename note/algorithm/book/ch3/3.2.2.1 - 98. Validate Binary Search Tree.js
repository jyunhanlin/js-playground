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
var isValidBST = function (root) {
  const isValid = (node, min, max) => {
    if (!node) return true;

    if (min && node.val <= min.val) return false;
    if (max && node.val >= max.val) return false;

    return isValid(node.left, min, node) && isValid(node.right, node, max);
  };

  return isValid(root, null, null);
};
