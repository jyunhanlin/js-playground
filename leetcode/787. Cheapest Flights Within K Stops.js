/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  // BFS and adjacency list
  const adj = {};
  const dp = new Array(n).fill(Infinity);
  dp[src] = 0;

  for (let i = 0; i < flights.length; i += 1) {
    const [from, to, price] = flights[i];
    if (!adj[from]) adj[from] = [];
    adj[from].push([to, price]);
  }

  const queue = [[[src, 0]]];
  while (k >= 0 && queue.length > 0) {
    k -= 1;
    const curAdj = queue.shift();
    const newAdj = [];
    for (let i = 0; i < curAdj.length; i += 1) {
      const [curNode, curPrice] = curAdj[i];
      if (adj[curNode]) {
        for (let j = 0; j < adj[curNode].length; j += 1) {
          const [nextNode, nextPrice] = adj[curNode][j];
          const newPrice = curPrice + nextPrice;
          if (newPrice < dp[nextNode]) {
            dp[nextNode] = newPrice;
            newAdj.push([nextNode, newPrice]);
          }
        }
      }
    }
    if (newAdj.length) queue.push(newAdj);
  }

  return dp[dst] === Infinity ? -1 : dp[dst];
};
