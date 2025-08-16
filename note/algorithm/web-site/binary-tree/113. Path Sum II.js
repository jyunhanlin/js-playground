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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  const res = [];
  let curSum = 0;
  const paths = [];
  const traverse = (node) => {
    if (!node) return;

    curSum += node.val;
    paths.push(node.val);

    if (!node.left && !node.right && curSum === targetSum) {
      res.push([...paths]);
    }

    traverse(node.left);
    traverse(node.right);
    paths.pop();
    curSum -= node.val;
  };

  traverse(root);

  return res;
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  const res = [];

  if (!root) return res;

  if (!root.left && !root.right && targetSum - root.val === 0) {
    res.push([root.val]);
    return res;
  }

  const left = pathSum(root.left, targetSum - root.val);
  const right = pathSum(root.right, targetSum - root.val);

  for (const l of left) {
    l.unshift(root.val);
    res.push(l);
  }

  for (const r of right) {
    r.unshift(root.val);
    res.push(r);
  }

  return res;
};
