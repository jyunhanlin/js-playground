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
  if (!root) return [];
  const queue = [root];
  const res = [];

  while (queue.length) {
    const curLen = queue.length;
    let max = -Infinity;

    for (let i = 0; i < curLen; i += 1) {
      const cur = queue.shift();
      max = Math.max(cur.val, max);
      cur.left && queue.push(cur.left);
      cur.right && queue.push(cur.right);
    }
    res.push(max);
    max = -Infinity;
  }

  return res;
};
