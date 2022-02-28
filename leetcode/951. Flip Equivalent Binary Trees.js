/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var flipEquiv = function (root1, root2) {
  if (!root1 && !root2) return true;
  if ((root1 && !root2) || (!root1 && root2)) return false;
  if (root1.val !== root2.val) return false;

  let root1LevelCount = 0;
  if (root1.left) root1LevelCount++;
  if (root1.right) root1LevelCount++;

  let root2LevelCount = 0;
  if (root2.left) root2LevelCount++;
  if (root2.right) root2LevelCount++;

  const root1LeftVal = root1.left?.val;
  const root1RightVal = root1.right?.val;

  const root2LeftVal = root2.left?.val;
  const root2RightVal = root2.right?.val;

  if (root1LevelCount !== root2LevelCount) return false;

  let case1Res = false;
  if (root1LeftVal === root2LeftVal && root1RightVal === root2RightVal) {
    case1Res = flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right);
  }

  let case2Res = false;
  if (root1LeftVal === root2RightVal && root1RightVal === root2LeftVal) {
    case1Res = flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left);
  }

  return case1Res || case2Res;
};
