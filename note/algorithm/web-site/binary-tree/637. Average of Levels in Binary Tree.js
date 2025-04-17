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
var averageOfLevels = function (root) {
  const res = [];
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    let sum = 0;
    for (let i = 0; i < size; i += 1) {
      const node = queue.shift();
      sum += node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    res.push(sum / size);
  }

  return res;
};
