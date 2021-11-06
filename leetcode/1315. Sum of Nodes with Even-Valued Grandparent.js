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
var sumEvenGrandparent = function (root, parent = null, grandparent = null) {
  if (root === null) return 0;
  const val = grandparent === null || grandparent.val % 2 !== 0 ? 0 : root.val;
  return (
    val + sumEvenGrandparent(root.left, root, parent) + sumEvenGrandparent(root.right, root, parent)
  );
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
 * @return {number}
 */
var sumEvenGrandparent = function (root) {
  let result = 0;

  const traversal = (cur, parent, grandparent) => {
    if (!cur) return;

    if (grandparent && grandparent.val % 2 === 0) result += cur.val;
    traversal(cur.left, cur, parent);
    traversal(cur.right, cur, parent);
  };

  traversal(root, null, null);

  return result;
};
