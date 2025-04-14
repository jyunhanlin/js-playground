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
var distributeCoins = function (root) {
  let res = 0;

  const getRestCoins = (node) => {
    if (!node) return 0;
    const left = getRestCoins(node.left);
    const right = getRestCoins(node.right);

    res += Math.abs(left) + Math.abs(right) + node.val - 1;

    return left + right + node.val - 1;
  };

  getRestCoins(root);

  return res;
};
