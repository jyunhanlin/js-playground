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
var bstToGst = function (root) {
  const values = [];

  const inorder = (cur) => {
    cur.left && inorder(cur.left);
    values.push(cur.val);
    cur.right && inorder(cur.right);
  };

  inorder(root);

  const traversal = (cur) => {
    cur.val += values.filter((val) => val > cur.val).reduce((acc, cur) => (acc += cur), 0);

    cur.left && traversal(cur.left);
    cur.right && traversal(cur.right);
  };

  traversal(root);

  return root;
};

var bstToGst = function (root) {
  const getSum = (node, sum) => {
    if (!node) return sum;

    node.val += getSum(node.right, sum);

    return getSum(node.left, node.val);
  };

  getSum(root, 0);

  return root;
};
