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
var pseudoPalindromicPaths = function (root) {
  let res = 0;
  let count = 0; // also can use count object
  const traverse = (node) => {
    if (!node) return;

    if (!node.left && !node.right) {
      count ^= 1 << node.val;

      if ((count & (count - 1)) === 0) res += 1;

      count ^= 1 << node.val;
      return;
    }

    count ^= 1 << node.val;

    traverse(node.left);
    traverse(node.right);
    count ^= 1 << node.val;
  };

  traverse(root);
  return res;
};
