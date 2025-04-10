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
var maxAncestorDiff = function (root) {
  let res = 0;

  const getMinMax = (node) => {
    if (!node) return [Infinity, -Infinity];

    const left = getMinMax(node.left);
    const right = getMinMax(node.right);

    const min = Math.min(node.val, left[0], right[0]);
    const max = Math.max(node.val, left[1], right[1]);

    res = Math.max(res, max - node.val, node.val - min);

    return [min, max];
  };

  getMinMax(root);

  return res;
};
