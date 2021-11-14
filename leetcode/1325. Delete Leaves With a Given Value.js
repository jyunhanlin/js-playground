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
 * @param {number} target
 * @return {TreeNode}
 */
var removeLeafNodes = function (root, target) {
  const postOrder = (cur, parent, fromLeft) => {
    cur.left && postOrder(cur.left, cur, true);
    cur.right && postOrder(cur.right, cur, false);

    if (!cur.left && !cur.right && cur.val === target && parent) {
      if (fromLeft) parent.left = null;
      else parent.right = null;
    }
  };

  postOrder(root, null, null);

  if (!root.left && !root.right && root.val === target) return null;

  return root;
};

const removeLeafNodes = (node, target) => (
  node.left && (node.left = removeLeafNodes(node.left, target)),
  node.right && (node.right = removeLeafNodes(node.right, target)),
  node.left === node.right && node.val === target ? null : node
);

const removeLeafNodes = (node, target) => {
  node.left && (node.left = removeLeafNodes(node.left, target));
  node.right && (node.right = removeLeafNodes(node.right, target));
  return node.left === node.right && node.val === target ? null : node;
};
