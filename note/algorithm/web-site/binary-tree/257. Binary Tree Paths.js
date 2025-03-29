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
  const res = [];

  const traverse = (node, path) => {
    if (!node) return;

    if (!node.left && !node.right) {
      path.push(node.val);
      res.push(path.join('->'));
      path.pop();
      return;
    }

    path.push(node.val);

    traverse(node.left, path);
    traverse(node.right, path);
    path.pop();
  };

  traverse(root, []);
  return res;
};
