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

      if (cur.left) {
        cur.left.next = cur.right;
        if (i > 0 && i < curLevel.length) {
          const pre = curLevel[i - 1];
          pre.right.next = cur.left;
        }

        nextLevel.push(cur.left, cur.right);
      }
    }

    nextLevel.length && queue.push(nextLevel);
  }
  return root;
};

// dfs
var connect = function (root) {
  if (root == null || root.left == null) return root;
  root.left.next = root.right;
  root.right.next = root.next ? root.next.left : null;
  connect(root.left);
  connect(root.right);
  return root;
};
