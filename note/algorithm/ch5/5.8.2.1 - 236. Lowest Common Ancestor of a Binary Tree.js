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
  const val1 = p.val;
  const val2 = q.val;

  const find = (root) => {
    if (!root) return null;

    if (root.val === val1 || root.val === val2) return root;

    const left = find(root.left);
    const right = find(root.right);

    if (left && right) return root;

    return left ? left : right;
  };

  return find(root, p.val, q.val);
};
