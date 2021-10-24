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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
  let result = 0;

  const traversal = (cur) => {
    if (cur && cur.val >= low && cur.val <= high) result += cur.val;

    cur.left && traversal(cur.left);
    cur.right && traversal(cur.right);
  };

  traversal(root);

  return result;
};
