/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function (root1, root2) {
  const arr1 = [];
  const arr2 = [];
  traversal(root1, arr1);
  traversal(root2, arr2);
  const ret = [];
  let idx1 = (idx2 = 0);
  while (idx1 < arr1.length && idx2 < arr2.length) {
    arr1[idx1] < arr2[idx2] ? ret.push(arr1[idx1++]) : ret.push(arr2[idx2++]);
  }
  while (idx1 < arr1.length) ret.push(arr1[idx1++]);
  while (idx2 < arr2.length) ret.push(arr2[idx2++]);
  return ret;

  function traversal(node, arr) {
    if (!node) return;
    traversal(node.left, arr);
    arr.push(node.val);
    traversal(node.right, arr);
  }
};
