/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0;
  const queue = [[root]];
  let depth = 0;

  while (queue.length) {
    const curLevel = queue.shift();
    const nextLevel = [];

    if (curLevel.length) depth += 1;

    while (curLevel.length) {
      const cur = curLevel.shift();

      if (cur && cur.children) {
        for (const child of cur.children) {
          nextLevel.push(child);
        }
      }
    }

    if (nextLevel.length) queue.push(nextLevel);
  }

  return depth;
};

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (root == null) {
    return 0;
  }

  let max = 0;
  for (let child of root.children) {
    max = Math.max(max, maxDepth(child));
  }

  return max + 1;
};
