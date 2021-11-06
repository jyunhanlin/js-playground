/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
 */

var getTargetCopy = function (original, cloned, target) {
  let result;

  const traversal = (ori, clo) => {
    if (ori === target) result = clo;

    ori.left && traversal(ori.left, clo.left);
    ori.right && traversal(ori.right, clo.right);
  };

  traversal(original, cloned);

  return result;
};
