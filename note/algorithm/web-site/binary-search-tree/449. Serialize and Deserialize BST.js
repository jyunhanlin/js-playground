/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  const res = [];

  const traverse = (node) => {
    if (!node) return;

    res.push(node.val);
    traverse(node.left);
    traverse(node.right);
  };

  traverse(root);

  return res.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (!data) return null;

  const nodes = data.split(',').map(Number);

  const build = (left, right) => {
    if (left > right) return null;

    const rootVal = nodes[left];
    const root = new TreeNode(rootVal);

    const rightIndex = nodes.findIndex(
      (node, index) => index > left && index <= right && node > rootVal
    );

    if (rightIndex !== -1) {
      root.left = build(left + 1, rightIndex - 1);
      root.right = build(rightIndex, right);
    } else {
      root.left = build(left + 1, right);
    }

    return root;
  };

  return build(0, nodes.length - 1);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
