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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
  const xInfo = dfs(root, x, 0);
  const yInfo = dfs(root, y, 0);

  return xInfo[0] !== yInfo[0] && xInfo[1] === yInfo[1];
};

const dfs = (parent, target, depth) => {
  if (!parent) return [null, -1];

  if (
    (parent.left && parent.left.val === target) ||
    (parent.right && parent.right.val === target)
  ) {
    return [parent, depth + 1];
  }

  let leftResult = dfs(parent.left, target, depth + 1);
  let rightResult = dfs(parent.right, target, depth + 1);

  return leftResult[1] !== -1 ? leftResult : rightResult;
};
