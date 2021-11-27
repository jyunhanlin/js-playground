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
var maxLevelSum = function (root) {
  let level = 1;
  let curLevel = 1;
  const queue = [root];
  let max = root.val;

  // bfs
  while (queue.length) {
    let curLevelLen = queue.length;
    curLevel += 1;
    let nextLevelSum = 0;
    for (let i = 0; i < curLevelLen; i += 1) {
      const node = queue.shift();
      if (node.left) {
        queue.push(node.left);
        nextLevelSum += node.left.val;
      }
      if (node.right) {
        queue.push(node.right);
        nextLevelSum += node.right.val;
      }
    }

    if (queue.length && nextLevelSum > max) {
      max = nextLevelSum;
      level = curLevel;
    }
  }

  return level;
};
