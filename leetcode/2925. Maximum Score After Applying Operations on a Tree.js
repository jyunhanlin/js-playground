/**
 * @param {number[][]} edges
 * @param {number[]} values
 * @return {number}
 */
var maximumScoreAfterOperations = function (edges, values) {
  const adj = new Array(values.length).fill().map(() => []);
  const sums = new Array(values.length);
  const dp = new Array(values.length).fill(-1);

  for (const edge of edges) {
    const [u, v] = edge;
    adj[u].push(v);
    adj[v].push(u);
  }

  for (let i = 0; i < values.length; i++) {
    sums[i] = values[i];
  }

  const getSums = (parent, node) => {
    for (const child of adj[node]) {
      if (child !== parent) {
        getSums(node, child);
        sums[node] += sums[child];
      }
    }
  };

  getSums(0, -1);

  const helper = (parent, node) => {
    if (dp[node] !== -1) return dp[node];

    let childTotal = 0;
    let hasChild = false;
    for (let i = 0; i < adj[node].length; i += 1) {
      const child = adj[node][i];
      if (child !== parent) {
        hasChild = true;
        childTotal += helper(node, child);
      }
    }

    dp[node] = sums[node] - values[node];
    if (hasChild) dp[node] = Math.max(dp[node], childTotal + values[node]);

    return dp[node];
  };

  return helper(-1, 0);
};
