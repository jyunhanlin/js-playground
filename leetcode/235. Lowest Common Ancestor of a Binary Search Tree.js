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
  const pVal = p.val;
  const qVal = q.val;

  let cur = root;

  while (cur) {
    const curVal = cur.val;

    if (pVal < curVal && qVal < curVal) {
      cur = cur.left;
    } else if (curVal < pVal && curVal < qVal) {
      cur = cur.right;
    } else {
      return cur;
    }
  }

  return cur;
};
