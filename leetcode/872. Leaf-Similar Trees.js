/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  const r1 = [];
  const r2 = [];

  traversalLeaf(root1, r1);
  traversalLeaf(root2, r2);

  if (r1.length !== r2.length) return false;

  for (let i = 0; i < r1.length; i += 1) {
    if (r1[i] !== r2[i]) return false;
  }

  return true;
};

const traversalLeaf = (cur, result) => {
  if (cur && !cur.left && !cur.right) result.push(cur.val);

  cur.left && traversalLeaf(cur.left, result);
  cur.right && traversalLeaf(cur.right, result);
};
