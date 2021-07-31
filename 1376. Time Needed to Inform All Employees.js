/**
 * Concept:
 * 1. 將manager變成adjacency list
 * 2. dfs adjacency list
 */

/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function (n, headID, manager, informTime) {
  const adjList = manager.map(() => []);

  for (let i = 0; i < n; i += 1) {
    const dm = manager[i];

    if (dm !== -1) adjList[dm].push(i);
  }

  return dfs(headID, adjList, informTime);
};

const dfs = (currentId, adjList, informTime) => {
  if (adjList[currentId].length === 0) return 0;

  let max = 0;
  const subordinates = adjList[currentId];
  for (let i = 0; i < subordinates.length; i++) {
    max = Math.max(max, dfs(subordinates[i], adjList, informTime));
  }

  return max + informTime[currentId];
};
