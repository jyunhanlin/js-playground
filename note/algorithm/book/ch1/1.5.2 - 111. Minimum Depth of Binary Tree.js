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
var minDepth = function (root) {
  if (!root) return 0;

  const q = [root];
  let depth = 1;

  while (q.length) {
    const size = q.length;

    for (let i = 0; i < size; i += 1) {
      const cur = q.shift();
      if (!cur.left && !cur.right) return depth;

      cur.left && q.push(cur.left);
      cur.right && q.push(cur.right);
    }
    depth += 1;
  }

  return depth;
};
