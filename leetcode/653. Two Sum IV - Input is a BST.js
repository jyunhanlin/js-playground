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
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  const treeVals = [];

  const traversal = (cur) => {
    if (cur) treeVals.push(cur.val);
    cur.left && traversal(cur.left);
    cur.right && traversal(cur.right);
  };

  traversal(root);

  let i = 0;

  while (i < treeVals.length) {
    const remain = k - treeVals[i];

    const otherRemain = treeVals.indexOf(remain);
    if (otherRemain !== -1 && otherRemain !== i) return true;

    i++;
  }

  return false;
};

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  if (!root) return false;
  const set = new Set();
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (set.has(k - node.val)) return true;
    set.add(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return false;
};
