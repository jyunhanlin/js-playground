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
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  let cur = root;
  const newNode = new TreeNode(val);

  while (cur) {
    if (!cur.left && cur.val > val) {
      cur.left = newNode;
      break;
    } else if (!cur.right && cur.val < val) {
      cur.right = newNode;
      break;
    } else if (cur.left && cur.val > val) {
      cur = cur.left;
    } else if (cur.right && cur.val < val) {
      cur = cur.right;
    }
  }

  return root ? root : newNode;
};
