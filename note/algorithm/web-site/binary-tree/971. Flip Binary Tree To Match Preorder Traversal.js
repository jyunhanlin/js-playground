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
 * @param {number[]} voyage
 * @return {number[]}
 */
var flipMatchVoyage = function (root, voyage) {
  const res = [];
  let canFlip = true;
  let index = 0;

  const traverse = (node) => {
    if (!node || !canFlip) return;

    if (node.val !== voyage[index]) {
      canFlip = false;
      return;
    }

    index += 1;
    if (node.left && node.left.val !== voyage[index]) {
      [node.left, node.right] = [node.right, node.left];
      res.push(node.val);
    }

    traverse(node.left);
    traverse(node.right);
  };

  traverse(root);

  if (canFlip) return res;

  return [-1];
};
