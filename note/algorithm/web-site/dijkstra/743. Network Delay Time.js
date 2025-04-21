/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
  const graph = new Array(n + 1).fill().map(() => []);
  for (const [u, v, w] of times) {
    graph[u].push([v, w]);
  }

  const dp = new Array(n + 1).fill(Infinity);
  dp[k] = 0;
  const pq = new MinPriorityQueue((g) => g[1]);
  pq.enqueue([k, 0]);

  while (!pq.isEmpty()) {
    let [curNodeId, curDist] = pq.dequeue();

    if (curDist > dp[curNodeId]) {
      continue;
    }

    for (const [nextNodeId, nextWeight] of graph[curNodeId]) {
      const nextDist = dp[curNodeId] + nextWeight;

      if (dp[nextNodeId] > nextDist) {
        dp[nextNodeId] = nextDist;
        pq.enqueue([nextNodeId, nextDist]);
      }
    }
  }

  let res = 0;
  for (let i = 1; i < dp.length; i++) {
    if (dp[i] === Infinity) {
      return -1;
    }
    res = Math.max(res, dp[i]);
  }
  return res;

  return res === -Infinity ? -1 : res;
};
