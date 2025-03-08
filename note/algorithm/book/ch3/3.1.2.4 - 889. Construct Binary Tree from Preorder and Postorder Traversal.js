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
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function (preorder, postorder) {
  const build = (preStart, preEnd, postStart, postEnd) => {
    if (preStart > preEnd) return null;

    if (preStart === preEnd) return new TreeNode(preorder[preStart]);

    const rootVal = preorder[preStart];
    const leftRootVal = preorder[preStart + 1];

    const index = postorder.indexOf(leftRootVal);
    const leftSize = index - postStart + 1;

    const root = new TreeNode(rootVal);

    root.left = build(preStart + 1, preStart + leftSize, postStart, index);
    root.right = build(preStart + leftSize + 1, preEnd, index + 1, postEnd - 1);

    return root;
  };

  return build(0, preorder.length - 1, 0, postorder.length - 1);
};
