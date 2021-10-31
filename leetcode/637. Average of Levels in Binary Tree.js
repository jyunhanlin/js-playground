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
var averageOfLevels = function (root) {
  const result = [];

  const queue = [[root]];

  while (queue.length) {
    let curLevel = queue.shift();

    result.push(curLevel.reduce((acc, cur) => (acc += cur.val), 0) / curLevel.length);

    const nextLevel = [];
    for (let i = 0; i < curLevel.length; i += 1) {
      const cur = curLevel[i];
      cur.left && nextLevel.push(cur.left);
      cur.right && nextLevel.push(cur.right);
    }
    nextLevel.length && queue.push(nextLevel);
  }

  return result;
};

var averageOfLevels = function (root) {
  let q = [root],
    ans = [];
  while (q.length) {
    let qlen = q.length,
      row = 0;
    for (let i = 0; i < qlen; i++) {
      let curr = q.shift();
      row += curr.val;
      if (curr.left) q.push(curr.left);
      if (curr.right) q.push(curr.right);
    }
    ans.push(row / qlen);
  }
  return ans;
};
