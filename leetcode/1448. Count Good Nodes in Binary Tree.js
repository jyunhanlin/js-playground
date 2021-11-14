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
 * @return {number}
 */
var goodNodes = function (root) {
  let result = 1;
  const queue = [[root, root.val]];

  while (queue.length) {
    let curLevelLen = queue.length;

    for (let i = 0; i < curLevelLen; i += 1) {
      const cur = queue.shift();
      const curNode = cur[0];
      const curVal = cur[1];

      if (curNode.left) {
        if (curNode.left.val >= curVal) result += 1;
        queue.push([curNode.left, curNode.left.val >= curVal ? curNode.left.val : curVal]);
      }

      if (curNode.right) {
        if (curNode.right.val >= curVal) result += 1;
        queue.push([curNode.right, curNode.right.val >= curVal ? curNode.right.val : curVal]);
      }
    }
  }

  return result;
};
