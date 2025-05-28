/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function (node) {
  const clone = new Map();
  const traverse = (node) => {
    if (!node) return;
    if (clone.has(node)) return;

    clone.set(node, new _Node(node.val));

    const cloneNode = clone.get(node);

    for (let neighbor of node.neighbors) {
      traverse(neighbor);
      cloneNode.neighbors.push(clone.get(neighbor));
    }
  };

  traverse(node);

  return clone.get(node);
};
