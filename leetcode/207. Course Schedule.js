/**
 * Concept:
 * 1. 建立 adjacency list
 * 2.1 對於每個 course, 利用BFS 或是 DFS來檢查是否有 cycle
 * 2.2 使用Topological sort
 */

// BFS
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  if (prerequisites.length < 2) return true;

  const adjList = new Array(numCourses).fill(0).map(() => []);

  for (let i = 0; i < prerequisites.length; i += 1) {
    adjList[prerequisites[i][1]].push(prerequisites[i][0]);
  }

  for (let i = 0; i < numCourses; i++) {
    const queue = [];
    const seen = {};
    for (let j = 0; j < adjList[i].length; j++) {
      queue.push(adjList[i][j]);
    }

    while (queue.length) {
      const current = queue.shift();

      seen[current] = true;

      if (current === i) return false;
      const adjacent = adjList[current];
      for (let k = 0; k < adjacent.length; k++) {
        const next = adjacent[k];
        if (!seen[next]) {
          queue.push(next);
        }
      }
    }
  }

  return true;
};

// DFS

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  if (prerequisites.length < 2) return true;

  const adjList = new Array(numCourses).fill(0).map(() => []);

  for (let i = 0; i < prerequisites.length; i += 1) {
    adjList[prerequisites[i][1]].push(prerequisites[i][0]);
  }

  for (let i = 0; i < numCourses; i += 1) {
    const seen = {};

    const dfsResult = dfs(i, i, adjList, seen);

    if (!dfsResult) return false;
  }

  return true;
};

const dfs = (start, current, adjList, seen) => {
  seen[current] = true;
  const connections = adjList[current];

  for (let i = 0; i < connections.length; i += 1) {
    const conn = connections[i];

    if (conn === start) return false;

    if (!seen[conn]) {
      const result = dfs(start, conn, adjList, seen);

      if (!result) return false;
    }
  }

  return true;
};

// Topological sort
//在圖論中，由一個有向無環圖的頂點組成的序列，若且唯若滿足下列條件時，才能稱為該圖的一個拓撲排序（英語：Topological sorting）：
// 序列中包含每個頂點，且每個頂點只出現一次；
// 若A在序列中排在B的前面，則在圖中不存在從B到A的路徑。

var canFinish = function (numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adjList = inDegree.map(() => []);

  for (let i = 0; i < prerequisites.length; i += 1) {
    inDegree[prerequisites[i][0]]++;
    adjList[prerequisites[i][1]].push(prerequisites[i][0]);
  }

  const stack = [];

  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
      stack.push(i);
    }
  }

  let count = 0;

  while (stack.length) {
    const course = stack.pop();
    count++;

    const nextCourses = adjList[course];
    for (let i = 0; i < nextCourses.length; i += 1) {
      const nextCourse = nextCourses[i];

      inDegree[nextCourse]--;

      if (inDegree[nextCourse] === 0) {
        stack.push(nextCourse);
      }
    }
  }

  return count === numCourses;
};
