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

// time expired
var longestZigZag = function (root) {
  const maxZigZag = (node, direction, cur) => {
    if (node[direction]) {
      let left = 0;
      let right = 0;

      if (direction === 'left') {
        left = maxZigZag(node[direction], 'right', cur + 1);
      } else if (direction === 'right') {
        right = maxZigZag(node[direction], 'left', cur + 1);
      }

      const startLeft = maxZigZag(node[direction], 'left', 0) || 0;
      const startRight = maxZigZag(node[direction], 'right', 0) || 0;

      return Math.max(left, right, startLeft, startRight);
    }

    return cur;
  };

  const left = maxZigZag(root, 'left', 0);
  const right = maxZigZag(root, 'right', 0);

  return Math.max(left, right);
};

var longestZigZag = function (root) {
  let max = 0;

  const maxZigZag = (node, isLeft, cur) => {
    if (!node) return;

    max = Math.max(max, cur);

    if (isLeft) {
      maxZigZag(node.left, false, cur + 1);
      maxZigZag(node.right, true, 1);
    } else {
      maxZigZag(node.right, true, cur + 1);
      maxZigZag(node.left, false, 1);
    }
  };

  maxZigZag(root, true, 0);
  maxZigZag(root, false, 0);

  return max;
};
