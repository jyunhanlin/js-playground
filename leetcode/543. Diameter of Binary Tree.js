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
var diameterOfBinaryTree = function (root) {
  let diameter = 0;

  const dfs = (cur) => {
    if (!cur) return 0;

    const left = dfs(cur.left);
    const right = dfs(cur.right);

    diameter = Math.max(diameter, left + right);

    return 1 + Math.max(left, right);
  };

  dfs(root);

  return diameter;
};
