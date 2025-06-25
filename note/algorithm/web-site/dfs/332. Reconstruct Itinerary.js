// dfs + Eulerian circuit

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
  const graph = new Map();

  for (const [from, to] of tickets) {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from).push(to);
  }

  for (const tos of graph.values()) {
    tos.sort();
  }

  const postOrder = [];
  const traverse = (node) => {
    if (!graph.has(node)) {
      postOrder.push(node);
      return;
    }

    while (graph.get(node).length) {
      const v = graph.get(node).shift();
      traverse(v);
    }

    postOrder.push(node);
  };

  traverse('JFK');

  return postOrder.reverse();
};
