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
  let res = [];

  let prev = null;
  let curCount = 0;
  let maxCount = 0;

  const traverse = (node) => {
    if (!node) return;

    traverse(node.left);

    if (!prev) {
      curCount = 1;
      maxCount = 1;
      res.push(node.val);
    } else {
      if (node.val === prev.val) {
        curCount += 1;
        if (curCount === maxCount) {
          res.push(node.val);
        } else if (curCount > maxCount) {
          res = [node.val];
          maxCount = curCount;
        }
      }

      if (node.val !== prev.val) {
        curCount = 1;
        if (curCount === maxCount) {
          res.push(node.val);
        }
      }
    }

    prev = node;
    traverse(node.right);
  };

  traverse(root);
  return res;
};
