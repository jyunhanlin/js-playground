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

  const traverse = (node, arr) => {
    if (!node) return;
    traverse(node.left, arr);
    arr.push(node.val);
    traverse(node.right, arr);
  };

  traverse(root1, arr1);
  traverse(root2, arr2);

  const ret = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    arr1[i] < arr2[j] ? ret.push(arr1[i++]) : ret.push(arr2[j++]);
  }
  while (i < arr1.length) ret.push(arr1[i++]);
  while (j < arr2.length) ret.push(arr2[j++]);
  return ret;
};
