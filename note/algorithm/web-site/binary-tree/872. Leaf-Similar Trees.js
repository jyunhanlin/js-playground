/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  const getLeaf = (node) => {
    if (!node) return '';

    const left = getLeaf(node.left);
    const right = getLeaf(node.right);

    if (!left && !right) return `${node.val},`;

    return left + right;
  };

  return getLeaf(root1) === getLeaf(root2);
};
