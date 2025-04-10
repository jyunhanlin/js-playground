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
var longestUnivaluePath = function (root) {
  if (!root) return 0;

  let res = 0;

  const maxLen = (node, parentVal) => {
    if (!node) return 0;

    const left = maxLen(node.left, node.val);
    const right = maxLen(node.right, node.val);

    res = Math.max(res, left + right);

    if (node.val !== parentVal) return 0;

    return 1 + Math.max(left, right);
  };

  maxLen(root, root.val);

  return res;
};
