/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var postorder = function (root) {
  const result = [];

  const traversal = (cur) => {
    if (cur) {
      for (const child of cur.children) {
        traversal(child);
      }

      if (!cur.children.legnth) result.push(cur.val);
    }
  };

  traversal(root);

  return result;
};
