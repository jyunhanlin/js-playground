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
 * @return {number[]}
 */
var findMode = function (root) {
  const obj = {};

  const traversal = (cur) => {
    obj[cur.val] = obj[cur.val] ? obj[cur.val] + 1 : 1;

    cur.left && traversal(cur.left);
    cur.right && traversal(cur.right);
  };

  traversal(root);

  const max = Math.max(...Object.values(obj));

  return Object.keys(obj)
    .filter((key) => obj[key] === max)
    .map(Number);
};

var findMode = function (root) {
  var mode = [],
    curNodeVal = NaN,
    curNodeCount = 0,
    maxCount = -Infinity;

  var inorder = function (root) {
    if (!root) return;
    inorder(root.left);
    curNodeCount = (root.val === curNodeVal ? curNodeCount : 0) + 1;
    curNodeVal = root.val;
    if (curNodeCount > maxCount) {
      mode = [root.val];
      maxCount = curNodeCount;
    } else if (curNodeCount === maxCount) {
      mode.push(root.val);
    }
    inorder(root.right);
  };
  inorder(root);
  return mode;
};
