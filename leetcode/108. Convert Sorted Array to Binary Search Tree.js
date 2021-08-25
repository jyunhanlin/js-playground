/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  let start = 0,
    end = nums.length - 1;
  let mid = Math.floor((start + end) / 2);

  const root = new TreeNode(nums[mid]);

  root.left = genTree(nums, start, mid - 1);
  root.right = genTree(nums, mid + 1, end);

  return root;
};

const genTree = (nums, start, end) => {
  if (start <= end) {
    let mid = Math.floor((start + end) / 2);

    const cur = new TreeNode(nums[mid]);
    cur.left = genTree(nums, start, mid - 1);
    cur.right = genTree(nums, mid + 1, end);
    return cur;
  }

  return null;
};
