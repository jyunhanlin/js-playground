/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;

  const pQueue = [p];
  const qQueue = [q];

  while (pQueue.length && qQueue.length) {
    const curP = pQueue.shift();
    const curQ = qQueue.shift();

    if (curP.val !== curQ.val) return false;

    if (
      (curP.left && !curQ.left) ||
      (!curP.left && curQ.left) ||
      (curP.right && !curQ.right) ||
      (!curP.right && curQ.right)
    )
      return false;

    if (curP.left) pQueue.push(curP.left);
    if (curP.right) pQueue.push(curP.right);
    if (curQ.left) qQueue.push(curQ.left);
    if (curQ.right) qQueue.push(curQ.right);
  }

  return true;
};

// optimized
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  let sameTree = true;

  const check = (p, q) => {
    if (!p && !q) return;
    else if (!p || !q) {
      sameTree = false;
      return;
    } else if (p.val !== q.val) {
      sameTree = false;
      return;
    }

    check(p.left, q.left);
    check(p.right, q.right);
  };

  check(p, q);

  return sameTree;
};
