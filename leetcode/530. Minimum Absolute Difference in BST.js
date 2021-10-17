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
var getMinimumDifference = function (root) {
  // travesal
  let arr = [];

  const travesal = (cur) => {
    cur.left && travesal(cur.left);
    arr.push(cur.val);
    cur.right && travesal(cur.right);
  };

  travesal(root);

  let i = 1;
  let out = Infinity;
  while (i < arr.length) {
    let diff = Math.abs(arr[i - 1] - arr[i]);
    if (diff < out) out = diff;
    i++;
  }
  return out;
};
