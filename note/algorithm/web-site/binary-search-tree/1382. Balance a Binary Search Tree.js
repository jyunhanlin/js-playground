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
 * @return {TreeNode}
 */
var balanceBST = function (root) {
  const nums = [];

  const traverse = (node) => {
    if (!node) return;

    traverse(node.left);
    nums.push(node.val);
    traverse(node.right);
  };

  traverse(root);

  return sortedArrayToBST(nums);
};

var sortedArrayToBST = function (nums) {
  const build = (left, right) => {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const root = new TreeNode(nums[mid]);
    root.left = build(left, mid - 1);
    root.right = build(mid + 1, right);

    return root;
  };

  return build(0, nums.length - 1);
};
