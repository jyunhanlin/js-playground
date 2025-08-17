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
var increasingBST = function (root) {
  const inorder = [];

  const inorderTraversal = (cur) => {
    cur.left && inorderTraversal(cur.left);
    inorder.push(cur.val);
    cur.right && inorderTraversal(cur.right);
  };
  inorderTraversal(root);
  const newRoot = new TreeNode(inorder.shift());
  let cur = newRoot;

  while (inorder.length) {
    cur.right = new TreeNode(inorder.shift());
    cur = cur.right;
  }

  return newRoot;
};

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
var increasingBST = function (root) {
  if (!root) return null;

  const left = increasingBST(root.left);
  const right = increasingBST(root.right);

  root.left = null;
  root.right = right;

  if (!left) return root;

  let p = left;

  while (p && p.right) {
    p = p.right;
  }

  p.right = root;
  return left;
};
