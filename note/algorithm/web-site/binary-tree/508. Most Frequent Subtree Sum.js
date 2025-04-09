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
var findFrequentTreeSum = function (root) {
  const obj = {};

  const traverse = (node) => {
    if (!node) return 0;

    const left = traverse(node.left);
    const right = traverse(node.right);

    const sum = left + right + node.val;

    if (!obj[sum]) obj[sum] = 1;
    else obj[sum] += 1;

    return sum;
  };

  traverse(root);

  const maxCount = Math.max(...Object.values(obj));

  return Object.keys(obj)
    .filter((key) => obj[key] === maxCount)
    .map(Number);
};
