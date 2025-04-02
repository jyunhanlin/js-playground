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
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function (root, val, depth) {
  if (depth === 1) {
    const node = new TreeNode(val);
    node.left = root;
    return node;
  }

  const traverse = (node, curDepth) => {
    if (!node) return;

    if (curDepth === depth - 1) {
      const newLeft = new TreeNode(val);
      const newRight = new TreeNode(val);

      newLeft.left = node.left;
      newRight.right = node.right;
      node.left = newLeft;
      node.right = newRight;

      return;
    }

    traverse(node.left, curDepth + 1);
    traverse(node.right, curDepth + 1);
  };

  traverse(root, 1);

  return root;
};
