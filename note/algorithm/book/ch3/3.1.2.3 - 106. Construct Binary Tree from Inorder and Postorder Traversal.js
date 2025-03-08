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
  const build = (inStart, inEnd, postStart, postEnd) => {
    if (inStart > inEnd) return null;

    const rootVal = postorder[postEnd];
    const index = inorder.indexOf(rootVal);

    const leftSize = index - inStart;

    const root = new TreeNode(rootVal);

    root.left = build(inStart, index - 1, postStart, postStart + leftSize - 1);
    root.right = build(index + 1, inEnd, postStart + leftSize, postEnd - 1);

    return root;
  };

  return build(0, inorder.length - 1, 0, postorder.length - 1);
};
