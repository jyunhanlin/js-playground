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
var rightSideView = function (root) {
  if (!root) return [];

  const queue = [root];

  const res = [];

  while (queue.length) {
    const len = queue.length;

    const last = queue[0];
    res.push(last.val);

    for (let i = 0; i < len; i += 1) {
      const cur = queue.shift();

      if (cur.right) queue.push(cur.right);
      if (cur.left) queue.push(cur.left);
    }
  }

  return res;
};

// if use dfs, use depth to record the depth of the node
// and also dfs from right to left
