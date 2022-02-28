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
 * @return {TreeNode}
 */
var convertBST = function (root) {
  if (!root) return null;

  let acc = 0;

  const traversal = (cur) => {
    cur.right && traversal(cur.right);
    if (cur) {
      cur.val += acc;
      acc = cur.val;
    }
    cur.left && traversal(cur.left);
  };

  traversal(root);

  return root;
};
