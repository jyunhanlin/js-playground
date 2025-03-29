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
 * @return {string}
 */
var smallestFromLeaf = function (root) {
  let res = null;

  const traverse = (node, path) => {
    if (!node) return;

    if (!node.left && !node.right) {
      path.push(String.fromCharCode(node.val + 97));
      path.reverse();

      let s = path.join('');
      if (res === null || res.localeCompare(s) > 0) {
        res = s;
      }

      path.reverse();
      path.pop();
      return;
    }

    path.push(String.fromCharCode(node.val + 97));

    traverse(node.left, path);
    traverse(node.right, path);
    path.pop();
  };

  traverse(root, []);

  return res;
};
