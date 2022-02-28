/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  // BFS
  const result = [[root.val]];
  const queue = [[root]];

  while (queue.length) {
    const curLevel = queue.shift();
    const nextLevel = [];
    const nextLevelRes = [];

    for (let curNode of curLevel) {
      console.log(curNode.children.length);

      if (curNode.children.length) {
        nextLevel.push(...curNode.children);

        for (let child of curNode.children) {
          nextLevelRes.push(child.val);
        }
      }
    }

    if (nextLevel.length) {
      result.push(nextLevelRes);
      queue.push(nextLevel);
    }
  }

  return result;
};
