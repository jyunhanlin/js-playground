/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length) return undefined;

  const rootVal = preorder[0];
  const rootIdxInInorder = inorder.indexOf(rootVal);

  const root = new TreeNode(rootVal);

  const leftInorder = inorder.slice(0, rootIdxInInorder);
  const leftPreOrder = preorder.slice(1, leftInorder.length + 1);

  const rightInorder = inorder.slice(rootIdxInInorder + 1);
  const rightPreOrder = preorder.slice(leftPreOrder.length + 1);

  if (leftInorder.length) root.left = buildTree(leftPreOrder, leftInorder);
  if (rightInorder.length) root.right = buildTree(rightPreOrder, rightInorder);

  return root;
};
