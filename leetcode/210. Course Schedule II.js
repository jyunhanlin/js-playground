/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
// DFS
var findOrder = function (numCourses, prerequisites) {
  const postOrder = [];
  let hasCycle = false;
  const visited = new Array(numCourses).fill(0);
  const onPath = new Array(numCourses).fill(0);

  // build graph
  const graph = buildGraph(numCourses, prerequisites);

  const traverse = (course) => {
    if (onPath[course]) hasCycle = true;

    if (visited[course] || hasCycle) return;

    onPath[course] = 1;
    visited[course] = 1;

    for (const preCourse of graph[course]) {
      traverse(preCourse);
    }
    postOrder.push(course);
    onPath[course] = 0;
  };

  for (let i = 0; i < numCourses; i += 1) {
    traverse(i);
  }

  if (hasCycle) return [];

  return postOrder.reverse();
};

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
// BFS
var findOrder = function (numCourses, prerequisites) {
  const graph = buildGraph(numCourses, prerequisites);

  const indegree = new Array(numCourses).fill(0);
  for (const [to] of prerequisites) {
    indegree[to] += 1;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i += 1) {
    if (indegree[i] === 0) queue.push(i);
  }

  const res = [];
  let count = 0;

  while (queue.length) {
    const cur = queue.shift();
    res[count] = cur;
    count += 1;

    for (const next of graph[cur]) {
      indegree[next] -= 1;
      if (indegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  if (count !== numCourses) return [];

  return res;
};

const buildGraph = (numCourses, prerequisites) => {
  const graph = new Array(numCourses).fill().map(() => []);
  for (const [to, from] of prerequisites) {
    graph[from].push(to);
  }
  return graph;
};
