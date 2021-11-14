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
  const inorder = [];
  const traversal = (cur) => {
    cur.left && traversal(cur.left);
    inorder.push(cur.val);
    cur.right && traversal(cur.right);
  };

  traversal(root);

  const newrootIndex = Math.floor(inorder.length / 2);

  const newroot = new TreeNode(inorder[newrootIndex]);

  const buildBBST = (nums) => {
    if (!nums.length) return null;
    const bbstRootIndex = Math.floor(nums.length / 2);
    const bbstRoot = new TreeNode(nums[bbstRootIndex]);
    bbstRoot.left = buildBBST(nums.slice(0, bbstRootIndex));
    bbstRoot.right = buildBBST(nums.slice(bbstRootIndex + 1));

    return bbstRoot;
  };

  newroot.left = buildBBST(inorder.slice(0, newrootIndex));
  newroot.right = buildBBST(inorder.slice(newrootIndex + 1));

  return newroot;
};
