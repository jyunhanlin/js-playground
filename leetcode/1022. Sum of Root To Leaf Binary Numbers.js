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
var sumRootToLeaf = function (root) {
  const result = [];

  const dfs = (cur, curPath) => {
    if (cur) curPath = `${curPath}${cur.val}`;

    if (!cur.left && !cur.right) result.push(curPath);

    cur.left && dfs(cur.left, curPath);
    cur.right && dfs(cur.right, curPath);
  };
  dfs(root, '');

  return result.reduce((acc, cur) => (acc += Number(`0b${cur}`)), 0);
};
