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
var rightSideView = function (root) {
  if (!root) return [];

  const curLevel = [root];
  const result = [];

  while (curLevel.length) {
    const curLevelVals = [];
    let length = curLevel.length,
      count = 0;
    while (count < length) {
      const currentNode = curLevel.shift();

      curLevelVals.push(currentNode.val);

      if (currentNode.left) {
        curLevel.push(currentNode.left);
      }

      if (currentNode.right) {
        curLevel.push(currentNode.right);
      }

      count++;
    }

    result.push(curLevelVals.pop());
  }

  return result;
};

// dfs

const dfs = (node, currentLevel, result) => {
  if (!node) return;
  if (currentLevel >= result.length) {
    result.push(node.value);
  }

  if (node.right) {
    dfs(node.right, currentLevel + 1, result);
  }

  if (node.left) {
    dfs(node.left, currentLevel + 1, result);
  }
};

const rightSideViewDFS = function (root) {
  const result = [];

  dfs(root, 0, result);
  return result;
};
