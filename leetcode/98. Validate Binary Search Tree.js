/**
 * Concept:
 * DFS or BFS, 根據min, max 檢查每個node的value
 */

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
 * @return {boolean}
 */
var isValidBST = function (root) {
  if (!root) return true;

  return (
    checkValidation(root.left, -Infinity, root.val) &&
    checkValidation(root.right, root.val, Infinity)
  );
};

const checkValidation = (curNode, min, max) => {
  if (!curNode) return true;

  if (curNode.val - 1 < min || curNode.val + 1 > max) return false;

  return (
    checkValidation(curNode.left, min, curNode.val) &&
    checkValidation(curNode.right, curNode.val, max)
  );
};
