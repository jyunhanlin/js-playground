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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (s, t) {
  if (!s) return !t;
  return isEqual(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
};

const isEqual = (lt, rt) => {
  if (!lt || !rt) return !lt && !rt;
  if (lt.val !== rt.val) return false;
  return isEqual(lt.left, rt.left) && isEqual(lt.right, rt.right);
};

const isSubtree = (s, t) => {
  return JSON.stringify(s).indexOf(JSON.stringify(t)) !== -1;
};
