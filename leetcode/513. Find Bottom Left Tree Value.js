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
var findBottomLeftValue = function (root) {
  const queue = [root];
  let res = root.val;

  while (queue.length) {
    const curLevelLen = queue.length;

    for (let i = 0; i < curLevelLen; i += 1) {
      const cur = queue.shift();
      if (i === 0) res = cur.val;

      cur.left && queue.push(cur.left);
      cur.right && queue.push(cur.right);
    }
  }

  return res;
};
