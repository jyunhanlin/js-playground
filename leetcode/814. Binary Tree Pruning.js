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
 * @return {TreeNode}
 */
var pruneTree = function (root) {
  const traversal = (cur, parent, isLeft) => {
    cur.left && traversal(cur.left, cur, true);
    cur.right && traversal(cur.right, cur, false);

    if (cur && cur.val === 0) {
      let needPrune = false;
      if (!cur.left && !cur.right) needPrune = true;

      if (needPrune && parent) {
        cur = null;
        if (isLeft) parent.left = null;
        else parent.right = null;
      }
    }
  };

  traversal(root, null, null);

  if (root.val === 0 && !root.left && !root.right) return null;

  return root;
};

const pruneTree = function (root) {
  root.right = root.right && pruneTree(root.right);
  root.left = root.left && pruneTree(root.left);
  if (root.val === 0 && !root.right && !root.left) return null;
  else return root;
};
