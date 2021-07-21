function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

const buildTree = (start, end) => {
  const result = [];
  if (start > end) return [null];

  if (start === end) return [new TreeNode(start)];

  if (end - start === 1) {
    const first = new TreeNode(start, null, new TreeNode(end));
    const second = new TreeNode(end, new TreeNode(start), null);
    return [first, second];
  }

  for (let i = start; i <= end; i++) {
    const leftSide = buildTree(start, i - 1);
    const rightSide = buildTree(i + 1, end);
    console.log('head', i);
    console.log('leftSide', start, i - 1, leftSide);
    console.log('rightSide', i + 1, end, rightSide);

    leftSide.forEach((ls) => {
      rightSide.forEach((rs) => {
        const tree = new TreeNode(i, ls, rs);

        // if (i === 1) {
        //   console.log(ls);
        //   console.log(rs);
        //   console.log(tree);
        // }

        result.push(tree);
      });
    });
    // console.log(result);
  }

  return result;
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
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  return buildTree(1, n);
};

generateTrees(3);
