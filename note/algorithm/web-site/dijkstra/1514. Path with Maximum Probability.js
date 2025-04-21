/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start_node
 * @param {number} end_node
 * @return {number}
 */
var maxProbability = function (n, edges, succProb, start_node, end_node) {
  const graph = new Array(n).fill().map(() => []);
  for (let i = 0; i < edges.length; i++) {
    const from = edges[i][0];
    const to = edges[i][1];
    const weight = succProb[i];

    graph[from].push([to, weight]);
    graph[to].push([from, weight]);
  }

  const dp = new Array(n).fill(-1);
  const pq = new MaxPriorityQueue((a) => a[1]);

  dp[start_node] = 1;

  pq.enqueue([start_node, 1]);

  while (!pq.isEmpty()) {
    const [node, probability] = pq.dequeue();

    if (node === end_node) return probability;
    if (probability < dp[node]) continue;

    for (const [nextNode, nextWeight] of graph[node]) {
      let nextProbability = dp[node] * nextWeight;
      if (dp[nextNode] < nextProbability) {
        dp[nextNode] = nextProbability;
        pq.enqueue([nextNode, nextProbability]);
      }
    }
  }

  return 0;
};
