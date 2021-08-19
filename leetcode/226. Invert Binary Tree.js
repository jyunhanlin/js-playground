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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) return null;

  const queue = [root];

  while (queue.length) {
    const cur = queue.shift();

    [cur.left, cur.right] = [cur.right, cur.left];
    if (cur.left) queue.push(cur.left);
    if (cur.right) queue.push(cur.right);
  }

  return root;
};
