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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
  let px, dx;
  let py, dy;

  const traversal = (node, depth, parent) => {
    if (!node) return;

    if (parent && node.val === x) {
      px = parent;
      dx = depth;
    }

    if (parent && node.val === y) {
      py = parent;
      dy = depth;
    }

    traversal(node.left, depth + 1, node);
    traversal(node.right, depth + 1, node);
  };

  traversal(root, 0, null);

  return px !== py && dx === dy;
};
