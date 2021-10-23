/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (!root) return null;
  const queue = [[root]];
  root.next = null;

  while (queue.length) {
    const curLevel = queue.shift();

    const nextLevel = [];
    for (let i = 0; i < curLevel.length; i += 1) {
      const cur = curLevel[i];

      cur.left && nextLevel.push(cur.left);
      cur.right && nextLevel.push(cur.right);
    }

    for (let i = 1; i < nextLevel.length; i += 1) {
      const pre = nextLevel[i - 1];
      const cur = nextLevel[i];
      pre.next = cur;
    }

    nextLevel.length && queue.push(nextLevel);
  }
  return root;
};
