/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (!inorder.length) return undefined;
  const treeLen = inorder.length;

  const rootVal = postorder[treeLen - 1];
  const rootIdxInInorder = inorder.indexOf(rootVal);

  const root = new TreeNode(rootVal);

  const leftInorder = inorder.slice(0, rootIdxInInorder);
  const leftPostorder = postorder.slice(0, leftInorder.length);

  const rightInorder = inorder.slice(rootIdxInInorder + 1);
  const rightPostorder = postorder.slice(leftInorder.length, treeLen - 1);

  if (leftInorder.length) root.left = buildTree(leftInorder, leftPostorder);
  if (rightInorder.length) root.right = buildTree(rightInorder, rightPostorder);

  return root;
};
