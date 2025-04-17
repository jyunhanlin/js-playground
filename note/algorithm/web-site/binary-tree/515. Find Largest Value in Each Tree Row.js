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
 * @return {number[]}
 */
var largestValues = function (root) {
  const res = [];
  if (!root) return res;

  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    let max = -Infinity;

    for (let i = 0; i < size; i += 1) {
      const node = queue.shift();
      max = Math.max(max, node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(max);
  }

  return res;
};
