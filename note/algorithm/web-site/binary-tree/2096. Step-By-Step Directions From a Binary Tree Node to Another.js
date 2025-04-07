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
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
var getDirections = function (root, startValue, destValue) {
  let startPaths;
  let destPaths;
  const paths = [];

  const traverse = (node) => {
    if (!node) return;

    if (node.val === startValue) {
      startPaths = [...paths];
    } else if (node.val === destValue) {
      destPaths = [...paths];
    }

    paths.push('L');
    traverse(node.left);
    paths.pop();

    paths.push('R');
    traverse(node.right);
    paths.pop();
  };

  traverse(root);

  let p = 0;
  const m = startPaths.length;
  const n = destPaths.length;
  while (p < m && p < n && startPaths[p] === destPaths[p]) {
    p++;
  }
  startPaths = startPaths.slice(p);
  destPaths = destPaths.slice(p);

  return startPaths.map(() => 'U').join('') + destPaths.join('');
};
