/**
 * Concept:
 * 從最左側取得樹的高度 -> 得到最多可以有幾個 leaf node
 * 對於 leaf node 利用 binary search + dfs -> 確認該 node 是否存在
 *
 * Time Complexity: O(logN * log N)
 * Space Complexity: O(1)
 *
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 *

 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
  if (!root) return 0;

  const height = getHeight(root);

  if (height === 0) return 1;

  let leafLeft = 0,
    leafRight = Math.pow(2, height) - 1;

  while (leafLeft < leafRight) {
    const leafMid = Math.ceil((leafLeft + leafRight) / 2);

    const leafMidNode = checkNodeExists(root, height, leafMid);

    if (leafMidNode) {
      leafLeft = leafMid;
    } else {
      leafRight = leafMid - 1;
    }
  }

  return Math.pow(2, height) + leafLeft;
};

const checkNodeExists = (root, height, nodeNum) => {
  let cur = root;
  let heightCount = 0;

  let leafLeft = 0,
    leafRight = Math.pow(2, height);

  while (heightCount < height) {
    const leafMid = Math.ceil((leafLeft + leafRight) / 2);

    if (nodeNum >= leafMid) {
      cur = cur.right;
      leafLeft = leafMid;
    } else {
      cur = cur.left;
      leafRight = leafMid - 1;
    }
    heightCount++;
  }

  return cur;
};

const getHeight = (root) => {
  let height = 0;
  let cur = root;
  while (cur.left) {
    height++;
    cur = cur.left;
  }

  return height;
};
