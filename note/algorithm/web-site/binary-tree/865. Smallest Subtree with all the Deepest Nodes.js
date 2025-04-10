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

    if (left[1] === right[1]) {
      return [node, left[1] + 1];
    }

    const nextNode = left[1] > right[1] ? left : right;

    nextNode[1] += 1;

    return nextNode;
  };

  const [node] = maxDepth(root);

  return node;
};
