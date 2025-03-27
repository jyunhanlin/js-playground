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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
  const res = [];
  const visited = new Map();

  const traversal = (node) => {
    if (!node) return '';

    const left = traversal(node.left);
    const right = traversal(node.right);

    const val = `${node.val}-${left}-${right}`;

    const freq = visited.get(val) || 0;

    if (freq === 1) {
      res.push(node);
    }

    visited.set(val, freq + 1);

    return val;
  };

  traversal(root);

  return res;
};
