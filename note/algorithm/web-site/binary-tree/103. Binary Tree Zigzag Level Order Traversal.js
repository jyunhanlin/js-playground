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
var zigzagLevelOrder = function (root) {
  const res = [];
  if (!root) return res;

  const queue = [];
  queue.push(root);

  let shouldFlip = true;

  while (queue.length) {
    const size = queue.length;
    const level = [];

    for (let i = 0; i < size; i += 1) {
      const node = queue.shift();
      if (shouldFlip) level.push(node.val);
      else level.unshift(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    shouldFlip = !shouldFlip;
    res.push(level);
  }

  return res;
};
