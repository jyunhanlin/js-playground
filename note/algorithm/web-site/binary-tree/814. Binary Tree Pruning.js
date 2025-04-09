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
 * @return {TreeNode}
 */
var pruneTree = function (root) {
  const traverse = (node) => {
    if (!node) return;

    traverse(node.left);
    traverse(node.right);

    if (!node.left?.left && !node.left?.right && node.left?.val === 0) node.left = null;
    if (!node.right?.left && !node.right?.right && node.right?.val === 0) node.right = null;
  };

  traverse(root);

  if (!root.left && !root.right && root.val === 0) return null;

  return root;
};
