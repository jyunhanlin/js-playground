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

  const traverse = (root) => {
    if (!root) {
      res.push('#');
      return;
    }
    traverse(root.left);
    traverse(root.right);

    res.push(root.val);
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
  const nodes = data.split(',');

  const helper = (nodes) => {
    if (!nodes.length) return null;

    const rootVal = nodes.pop();
    if (rootVal === '#') return null;

    const root = new TreeNode(+rootVal);

    root.right = helper(nodes);
    root.left = helper(nodes);

    return root;
  };

  return helper(nodes);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
