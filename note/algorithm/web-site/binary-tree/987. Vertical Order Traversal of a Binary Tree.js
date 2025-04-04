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
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  const nodes = [];
  const traversal = (node, row, col) => {
    if (!node) return;

    nodes.push([node.val, row, col]);

    traversal(node.left, row + 1, col - 1);
    traversal(node.right, row + 1, col + 1);
  };

  traversal(root, 0, 0);

  return Array.from(
    nodes
      .sort((a, b) => {
        if (a[1] === b[1] && a[2] === b[2]) {
          return a[0] - b[0];
        }
        if (a[2] === b[2]) {
          return a[1] - b[1];
        }
        return a[2] - b[2];
      })
      .reduce((acc, cur) => {
        if (!acc.has(cur[2])) acc.set(cur[2], []);

        const values = acc.get(cur[2]);
        values.push(cur[0]);

        acc.set(cur[2], values);
        return acc;
      }, new Map())
      .values()
  );
};
