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
var sumOfLeftLeaves = function (root) {
  if (!root.left && !root.right) return 0;

  const result = [];

  const traversal = (cur, isLeft) => {
    if (!cur.left && !cur.right) {
      if (isLeft) result.push(cur.val);

      return;
    }

    if (cur.left) traversal(cur.left, true);
    if (cur.right) traversal(cur.right, false);
  };

  traversal(root, false);

  return result.reduce((acc, cur) => (acc += cur), 0);
};

var sumOfLeftLeaves = function (root, left = false) {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return left ? root.val : 0;
  return sumOfLeftLeaves(root.left, true) + sumOfLeftLeaves(root.right);
};
