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
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) return false;

  const result = [];

  dfs(root, 0, result);

  return result.includes(targetSum);
};

const dfs = (cur, curSum, result) => {
  if (!cur.left && !cur.right) {
    result.push(curSum + cur.val);
    return;
  }

  if (cur.left) dfs(cur.left, curSum + cur.val, result);
  if (cur.right) dfs(cur.right, curSum + cur.val, result);
};

// From discuss
var hasPathSum = function (root, sum) {
  return dfs(root, 0, sum);
};

var dfs = function (curr, currentSum, targetSum) {
  if (!curr) {
    return false;
  }

  currentSum += curr.val;

  if (curr.left === null && curr.right === null) {
    return currentSum === targetSum;
  }

  return dfs(curr.left, currentSum, targetSum) || dfs(curr.right, currentSum, targetSum);
};

var hasPathSum = function (root, sum) {
  if (!root) return false;

  if (!root.left && !root.right) {
    // check leaf
    return sum === root.val;
  } else {
    // continue DFS
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
  }
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
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  let curSum = 0;

  let hasTargetSum = false;

  const traverse = (node) => {
    if (!node) return;
    if (hasTargetSum) return;

    curSum += node.val;

    if (!node.left && !node.right && curSum === targetSum) {
      hasTargetSum = true;
      return;
    }

    traverse(node.left);
    traverse(node.right);

    curSum -= node.val;
  };

  traverse(root);

  return hasTargetSum;
};
