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
 * @param {number} n
 * @param {number} x
 * @return {boolean}
 */
var btreeGameWinningMove = function (root, n, x) {
  const find = (node) => {
    if (!node) return null;
    if (node.val === x) return node;

    const left = find(node.left);
    if (left) return left;

    return find(node.right);
  };

  const count = (node) => {
    if (!node) return 0;

    return 1 + count(node.left) + count(node.right);
  };

  const node = find(root);
  const leftNodes = count(node.left);
  const rightNodes = count(node.right);
  const otherNodes = n - 1 - leftNodes - rightNodes;

  return Math.max(leftNodes, rightNodes, otherNodes) > Math.floor(n / 2);
};
