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
var longestZigZag = function (root) {
  let max = 0;

  const getZigZagLen = (node) => {
    if (!node) return [-1, -1];

    const left = getZigZagLen(node.left);
    const right = getZigZagLen(node.right);

    const newLeftPath = left[1] + 1;
    const newRightPath = right[0] + 1;

    max = Math.max(max, newLeftPath, newRightPath);

    return [newLeftPath, newRightPath];
  };

  getZigZagLen(root);

  return max;
};
