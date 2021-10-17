/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
  const result = [];

  const traversal = (cur) => {
    if (cur) {
      result.push(cur.val);

      for (const child of cur.children) {
        traversal(child);
      }
    }
  };

  traversal(root);

  return result;
};
