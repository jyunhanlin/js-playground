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
var maxPathSum = function (root) {
  let max = -Infinity;
  const oneSideMax = (node) => {
    if (!node) return 0;

    const left = Math.max(0, oneSideMax(node.left));
    const right = Math.max(0, oneSideMax(node.right));

    let pathSum = node.val + left + right;
    max = Math.max(max, pathSum);
    return Math.max(left, right) + node.val;
  };

  oneSideMax(root);

  return max;
};
