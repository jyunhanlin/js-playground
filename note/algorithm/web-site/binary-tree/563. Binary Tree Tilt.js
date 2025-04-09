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
var findTilt = function (root) {
  let res = 0;

  const sum = (node) => {
    if (!node) return 0;

    const left = sum(node.left);
    const right = sum(node.right);

    res += Math.abs(left - right);

    return node.val + left + right;
  };

  sum(root);

  return res;
};
