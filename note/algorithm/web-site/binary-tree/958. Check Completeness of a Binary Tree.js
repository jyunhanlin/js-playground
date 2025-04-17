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
var isCompleteTree = function (root) {
  const queue = [root];

  let isNull = false;

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i += 1) {
      const node = queue.shift();

      if (!node) isNull = true;
      else {
        if (isNull) return false;

        queue.push(node.left);
        queue.push(node.right);
      }
    }
  }

  return true;
};
