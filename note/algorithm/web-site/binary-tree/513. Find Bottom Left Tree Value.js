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
var findBottomLeftValue = function (root) {
  let val = 0;
  let curDepth = 0;
  const traverse = (node, depth) => {
    if (!node) return;

    if (curDepth < depth) {
      curDepth = depth;
      val = node.val;
    }

    traverse(node.left, depth + 1);
    traverse(node.right, depth + 1);
  };

  traverse(root, 1);

  return val;
};
