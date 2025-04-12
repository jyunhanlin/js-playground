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
 * @return {string}
 */
var tree2str = function (root) {
  const build = (node) => {
    if (!node) return '';

    const left = build(node.left);
    const right = build(node.right);

    if (!left && !right) return `${node.val}`;

    return `${node.val}(${left})${right ? `(${right})` : ''}`;
  };

  return build(root);
};
