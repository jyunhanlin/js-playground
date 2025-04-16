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
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
  const queue = [[root, 0n]];
  let maxWidth = 0n;
  while (queue.length) {
    const size = queue.length;
    const start = queue[0][1];
    const end = queue[size - 1][1];

    for (let i = 0; i < size; i += 1) {
      const [node, id] = queue.shift();

      if (node.left) queue.push([node.left, 2n * id]);
      if (node.right) queue.push([node.right, 2n * id + 1n]);
    }

    const curWidth = end - start + 1n;

    maxWidth = maxWidth > curWidth ? maxWidth : curWidth;
  }

  return Number(maxWidth);
};
