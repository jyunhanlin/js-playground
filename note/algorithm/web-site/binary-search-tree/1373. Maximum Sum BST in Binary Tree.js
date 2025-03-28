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
var maxSumBST = function (root) {
  let maxSum = 0;

  const findMaxMinSum = (node) => {
    if (!node) return [1, Infinity, -Infinity, 0];

    const left = findMaxMinSum(node.left);
    const right = findMaxMinSum(node.right);

    const res = [0, 0, 0, 0]; // isBST, min, max, sum
    if (left[0] === 1 && right[0] === 1 && node.val > left[2] && node.val < right[1]) {
      res[0] = 1;
      res[1] = Math.min(node.val, left[1]);
      res[2] = Math.max(node.val, right[2]);
      res[3] = left[3] + node.val + right[3];

      maxSum = Math.max(maxSum, res[3]);
    }

    return res;
  };

  findMaxMinSum(root);

  return maxSum;
};
