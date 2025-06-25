/**
 * @param {number[][]} pairs
 * @return {number[][]}
 */
var validArrangement = function (pairs) {
  const graph = new Map();
  const inDegree = new Map();
  const outDegree = new Map();

  for (const [from, to] of pairs) {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from).push(to);
    inDegree.set(to, (inDegree.get(to) || 0) + 1);
    outDegree.set(from, (outDegree.get(from) || 0) + 1);
  }

  let start = pairs[0][0];
  for (const node of graph.keys()) {
    if ((outDegree.get(node) || 0) - (inDegree.get(node) || 0) === 1) {
      start = node;
      break;
    }
  }

  const postOrder = [];
  const traverse = (node) => {
    while (graph.has(node) && graph.get(node).length) {
      const to = graph.get(node).pop();
      traverse(to);
    }
    postOrder.push(node);
  };
  traverse(start);
  postOrder.reverse();

  const result = [];

  for (let i = 0; i < pairs.length; i += 1) {
    result.push([postOrder[i], postOrder[i + 1]]);
  }

  return result;
};
