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
  const result = [];

  const toDelObj = {};

  for (let i = 0; i < to_delete.length; i += 1) {
    toDelObj[to_delete[i]] = 1;
  }

  if (!toDelObj[root.val]) result.push(root);

  const traversal = (cur, par, isLeft) => {
    cur.left && traversal(cur.left, cur, true);
    cur.right && traversal(cur.right, cur, false);

    if (toDelObj[cur.val]) {
      if (par) {
        if (isLeft) par.left = null;
        else par.right = null;
      }
      cur.left && result.push(cur.left);
      cur.right && result.push(cur.right);
    }
  };

  traversal(root, null, null);

  return result;
};

const delNodes = (root, to_delete) => {
  const set = new Set(to_delete);
  const res = [];

  const go = (node) => {
    if (node == null) return node;
    node.left = go(node.left);
    node.right = go(node.right);

    if (set.has(node.val)) {
      if (node.left) res.push(node.left);
      if (node.right) res.push(node.right);
      return null;
    }
    return node;
  };

  if (!set.has(root.val)) res.push(root);
  go(root);
  return res;
};
