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
 */
var CBTInserter = function (root) {
  this.q = [];
  this.root = root;

  const queue = [root];

  while (queue.length) {
    const node = queue.shift();

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);

    if (!node.left || !node.right) this.q.push(node);
  }
};

/**
 * @param {number} val
 * @return {number}
 */
CBTInserter.prototype.insert = function (val) {
  const node = new TreeNode(val);

  const cur = this.q[0];

  if (!cur.left) cur.left = node;
  else if (!cur.right) {
    cur.right = node;
    this.q.shift();
  }

  this.q.push(node);

  return cur.val;
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function () {
  return this.root;
};

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(val)
 * var param_2 = obj.get_root()
 */
