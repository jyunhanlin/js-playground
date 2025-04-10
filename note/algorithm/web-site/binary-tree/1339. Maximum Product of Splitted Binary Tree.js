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
var maxProduct = function (root) {
  const MOD = 1e9 + 7;
  let res = 0;

  let sum;

  const getSum = (node) => {
    if (!node) return 0;

    const left = getSum(node.left);
    const right = getSum(node.right);

    if (sum) {
      const subSum = node.val + left + right;

      res = Math.max(res, subSum * (sum - subSum));
    }

    return node.val + left + right;
  };

  sum = getSum(root);

  getSum(root);

  return res % MOD;
};
