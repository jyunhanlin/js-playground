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
 * @return {boolean}
 */
var isEvenOddTree = function (root) {
  const queue = [root];
  let level = 0;

  while (queue.length) {
    const size = queue.length;
    const isEvenLevel = level % 2 === 0;

    let prev = isEvenLevel ? -Infinity : Infinity;

    for (let i = 0; i < size; i += 1) {
      const node = queue.shift();

      if (isEvenLevel) {
        if (prev >= node.val || node.val % 2 === 0) {
          return false;
        }
      } else {
        if (prev <= node.val || node.val % 2 === 1) {
          return false;
        }
      }
      prev = node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    level += 1;
  }

  return true;
};
