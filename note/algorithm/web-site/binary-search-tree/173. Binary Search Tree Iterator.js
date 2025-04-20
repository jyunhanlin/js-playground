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
var BSTIterator = function (root) {
  this.inorder = [];
  this.index = 0;

  const traverse = (node) => {
    if (!node) return;

    traverse(node.left);
    this.inorder.push(node.val);
    traverse(node.right);
  };
  traverse(root);
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  const val = this.inorder[this.index];
  this.index += 1;

  return val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.index < this.inorder.length;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

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
var BSTIterator = function (root) {
  this.stk = [];

  this.pushLeftBranch = (p) => {
    while (p != null) {
      this.stk.push(p);
      p = p.left;
    }
  };

  this.pushLeftBranch(root);
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  const p = this.stk.pop();
  this.pushLeftBranch(p.right);
  return p.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.stk.length > 0;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
