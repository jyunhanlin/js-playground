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
 * @return {number}
 */
var minCameraCover = function (root) {
  let res = 0;

  // -1: null
  // 0: non cover
  // 1: cover
  // 2: set camera
  const setCamera = (node, hasParent) => {
    if (!node) return -1;

    const left = setCamera(node.left, true);
    const right = setCamera(node.right, true);

    if (left === -1 && right === -1) {
      if (hasParent) return 0;
      res += 1;
      return 2;
    }

    if (left === 0 || right === 0) {
      res += 1;
      return 2;
    }

    if (left === 2 || right === 2) return 1;

    // left === 1 || right === 1;
    if (hasParent) return 0;

    res += 1;
    return 2;
  };

  setCamera(root, false);

  return res;
};
