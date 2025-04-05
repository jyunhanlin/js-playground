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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  let res = 0;
  let sum = 0;
  const sumCount = new Map();
  sumCount.set(0, 1);

  const traverse = (node) => {
    if (!node) return;

    sum += node.val;
    res += sumCount.get(sum - targetSum) || 0;
    sumCount.set(sum, (sumCount.get(sum) || 0) + 1);
    traverse(node.left);
    traverse(node.right);
    sumCount.set(sum, sumCount.get(sum) - 1);
    sum -= node.val;
  };

  traverse(root);

  return res;
};
