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
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  const arr = [];

  const traverse = (node) => {
    if (!node) return;

    traverse(node.left);
    arr.push(node.val);
    traverse(node.right);
  };

  traverse(root);

  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    let sum = arr[i] + arr[j];
    if (sum < k) {
      i++;
    } else if (sum > k) {
      j--;
    } else {
      return true;
    }
  }
  return false;
};
