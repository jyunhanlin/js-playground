/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  const val1 = Math.min(p.val, q.val);
  const val2 = Math.max(p.val, q.val);

  const find = (root) => {
    if (!root) return null;

    if (root.val > val2) {
      return find(root.left);
    }

    if (root.val < val1) {
      return find(root.right);
    }

    return root;
  };

  return find(root);
};
