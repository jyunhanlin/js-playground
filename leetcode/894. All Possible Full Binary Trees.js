/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var allPossibleFBT = function (n) {
  if (n % 2 === 0) return [];

  const mem = new Array(n + 1).fill(null).map((i) => []);

  const helper = (num) => {
    if (mem[num].length) return mem[num];
    if (num === 1) return [new TreeNode(0)];

    const tree = [];

    for (let i = 1; i < num - 1; i += 2) {
      const leftTree = helper(i);
      const rightTree = helper(num - i - 1);

      leftTree.forEach((ltn) => {
        rightTree.forEach((rtn) => {
          tree.push(new TreeNode(0, ltn, rtn));
        });
      });
    }

    mem[num] = tree;
    return mem[num];
  };

  return helper(n);
};
