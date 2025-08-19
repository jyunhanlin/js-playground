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
var subtreeWithAllDeepest = function (root) {
  const maxDepth = (node) => {
    if (!node) return [null, 0];

    const left = maxDepth(node.left);
    const right = maxDepth(node.right);

    const [, leftDepth] = left;
    const [, rightDepth] = right;

    if (leftDepth === rightDepth) {
      return [node, leftDepth + 1];
    }

    const nextNode = leftDepth > rightDepth ? left : right;

    return [nextNode[0], nextNode[1] + 1];
  };

  const [node] = maxDepth(root);

  return node;
};
