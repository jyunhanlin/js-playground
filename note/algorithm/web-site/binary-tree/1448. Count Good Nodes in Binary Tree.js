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
var goodNodes = function (root) {
  let res = 0;

  const traverse = (node, max) => {
    if (!node) return;
    if (node.val >= max) res += 1;

    const newMax = Math.max(max, node.val);

    traverse(node.left, newMax);
    traverse(node.right, newMax);
  };

  traverse(root, root.val);

  return res;
};
