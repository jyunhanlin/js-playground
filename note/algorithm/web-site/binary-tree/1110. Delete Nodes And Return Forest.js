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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function (root, to_delete) {
  const res = [];
  const doDelete = (node, hasParent) => {
    if (!node) return null;

    const shouldDelete = to_delete.includes(node.val);
    if (!shouldDelete && !hasParent) {
      res.push(node);
    }

    node.left = doDelete(node.left, !shouldDelete);
    node.right = doDelete(node.right, !shouldDelete);

    return shouldDelete ? null : node;
  };

  doDelete(root, false);
  return res;
};
