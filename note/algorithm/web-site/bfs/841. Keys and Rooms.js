/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  const n = rooms.length;
  const visited = new Array(n).fill(false);
  const queue = [];
  queue.push(0);
  visited[0] = true;

  while (queue.length > 0) {
    const room = queue.shift();
    for (const nextRoom of rooms[room]) {
      if (!visited[nextRoom]) {
        visited[nextRoom] = true;
        queue.push(nextRoom);
      }
    }
  }

  return visited.every((v) => v);
};
