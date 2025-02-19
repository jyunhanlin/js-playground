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
  if (!root) return '';

  let res = [];

  const queue = [root];

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i += 1) {
      const cur = queue.shift();

      if (!cur) {
        res.push('#');
        continue;
      }

      res.push(cur.val);

      queue.push(cur.left);
      queue.push(cur.right);
    }
  }

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

  const nodes = data.split(',');

  const root = new TreeNode(+nodes[0]);

  const queue = [root];

  let index = 1;
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i += 1) {
      const parent = queue.shift();

      const left = nodes[index++];

      if (left !== '#') {
        parent.left = new TreeNode(+left);
        queue.push(parent.left);
      }

      const right = nodes[index++];
      if (right !== '#') {
        parent.right = new TreeNode(+right);
        queue.push(parent.right);
      }
    }
  }

  return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
