/**
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
var nearestExit = function (maze, entrance) {
  const m = maze.length;
  const n = maze[0].length;
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const queue = [];
  const visited = new Array(m).fill().map(() => new Array(n).fill(0));
  queue.push(entrance);
  visited[entrance[0]][entrance[1]] = 1;

  let step = 0;
  while (queue.length) {
    const size = queue.length;
    step += 1;
    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();

      for (const dir of dirs) {
        const nx = x + dir[0];
        const ny = y + dir[1];
        if (nx < 0 || nx >= m || ny < 0 || ny >= n || visited[nx][ny] || maze[nx][ny] === '+') {
          continue;
        }

        if (nx === 0 || nx === m - 1 || ny === 0 || ny === n - 1) return step;

        queue.push([nx, ny]);
        visited[nx][ny] = 1;
      }
    }
  }
  return -1;
};
