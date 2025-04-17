/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  const parent = new Map();
  function traverse(node, parentNode) {
    if (node === null) return;
    parent.set(node.val, parentNode);
    traverse(node.left, node);
    traverse(node.right, node);
  }
  traverse(root, null);

  const q = [];
  const visited = new Set();
  q.push(target);
  visited.add(target.val);
  let dist = 0;
  let res = [];

  while (q.length) {
    const size = q.length;

    for (let i = 0; i < size; i += 1) {
      const node = q.shift();

      if (dist === k) res.push(node.val);

      const parentNode = parent.get(node.val);
      if (parentNode && !visited.has(parentNode.val)) {
        visited.add(parentNode.val);
        q.push(parentNode);
      }
      if (node.left && !visited.has(node.left.val)) {
        visited.add(node.left.val);
        q.push(node.left);
      }
      if (node.right && !visited.has(node.right.val)) {
        visited.add(node.right.val);
        q.push(node.right);
      }
    }

    dist += 1;
  }

  return res;
};
