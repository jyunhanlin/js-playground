/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
  if (!root1 || !root2) return root1 || root2;

  const traversal = (cur1, cur2, isLeft, curPar) => {
    if (!cur1 && !cur2) return;
    if (cur1 && cur2) cur1.val += cur2.val;
    if (!cur1 && cur2) {
      if (isLeft) curPar.left = cur2;
      else curPar.right = cur2;
    }

    const cur1Left = cur1 ? cur1.left : null;
    const cur2Left = cur2 ? cur2.left : null;
    traversal(cur1Left, cur2Left, true, cur1 || cur2);

    const cur1Right = cur1 ? cur1.right : null;
    const cur2Right = cur2 ? cur2.right : null;
    traversal(cur1Right, cur2Right, false, cur1 || cur2);
  };

  traversal(root1, root2);

  return root1;
};

var mergeTrees = function (t1, t2) {
  if (!t1 && !t2) return null;
  const root = new TreeNode(((t1 || 0).val || 0) + ((t2 || 0).val || 0));
  root.left = mergeTrees(t1 && t1.left, t2 && t2.left);
  root.right = mergeTrees(t1 && t1.right, t2 && t2.right);
  return root;
};
