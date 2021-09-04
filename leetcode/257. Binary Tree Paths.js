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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  const results = [];

  const dfs = (cur, curPath) => {
    if (!cur) return;

    curPath.push(cur.val);

    if (cur && !cur.left && !cur.right) {
      results.push(curPath);
      return;
    }

    dfs(cur.left, curPath.slice());
    dfs(cur.right, curPath.slice());
  };

  dfs(root, []);

  return results.map((result) => result.join('->'));
};
