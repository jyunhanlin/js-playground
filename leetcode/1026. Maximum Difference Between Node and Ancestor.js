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
var maxAncestorDiff = function (root) {
  let max = 0;

  const traversal = (cur, pVal, minAVal, maxAVal) => {
    if (cur) {
      max = Math.max(
        max,
        Math.abs(pVal - cur.val),
        Math.abs(minAVal - cur.val),
        Math.abs(maxAVal - cur.val)
      );
    }

    cur.left &&
      traversal(cur.left, cur.val, Math.min(minAVal, cur.val), Math.max(maxAVal, cur.val));
    cur.right &&
      traversal(cur.right, cur.val, Math.min(minAVal, cur.val), Math.max(maxAVal, cur.val));
  };

  traversal(root, root.val, root.val, root.val);

  return max;
};

var maxAncestorDiff = function (root) {
  if (root == null) {
    return 0;
  }

  let result = 0;
  helper(root, root.val, root.val);

  function helper(root, max, min) {
    if (root == null) {
      result = Math.max(result, max - min);
      return;
    }

    max = Math.max(max, root.val);
    min = Math.min(min, root.val);

    helper(root.left, max, min);
    helper(root.right, max, min);
  }

  return result;
};
