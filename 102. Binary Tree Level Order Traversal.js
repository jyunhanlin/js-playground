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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];

  const currentLevel = [root];
  const result = [];

  while (currentLevel.length) {
    const currentLevelLength = currentLevel.length;
    const currentLevelVals = [];

    for (let i = 0; i < currentLevelLength; i += 1) {
      const cur = currentLevel.shift();

      if (cur.left) currentLevel.push(cur.left);

      if (cur.right) currentLevel.push(cur.right);

      currentLevelVals.push(cur.val);
    }

    result.push(currentLevelVals);
  }

  return result;
};
