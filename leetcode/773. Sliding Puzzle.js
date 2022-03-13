/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function (board) {
  const flatBoard = board.flat();

  const posQueue = [];

  const initialBoardStr = flatBoard.toString();
  const boardQueue = [[flatBoard]];
  const requiredBoardStr = '1,2,3,4,5,0';

  if (initialBoardStr === requiredBoardStr) return 0;
  const visited = { initialBoardStr: 1 };

  let result = 0;
  let findPath = false;

  for (let i = 0; i < flatBoard.length; i += 1) if (flatBoard[i] === 0) posQueue.push([i]);

  while (posQueue.length) {
    const currentLevel = posQueue.shift();
    const currentLevelFortBoard = boardQueue.shift();

    let newPosLevel = [];
    let newBoardLevel = [];

    for (let i = 0; i < currentLevel.length; i += 1) {
      if (findPath) break;
      const startPos = currentLevel[i];
      const currentBoard = currentLevelFortBoard[i];

      for (let j = 0; j < POS_MOVEABLE[startPos].length; j += 1) {
        if (findPath) break;
        const targetPos = POS_MOVEABLE[startPos][j];

        const newBoard = switchPos(currentBoard, startPos, targetPos);
        const newBoardStr = newBoard.toString();

        visited[newBoardStr] = visited[newBoardStr] ? visited[newBoardStr] + 1 : 1;

        if (newBoardStr === requiredBoardStr) {
          findPath = true;
          break;
        } else if (visited[newBoardStr] === 1) {
          newPosLevel.push(targetPos);
          newBoardLevel.push(newBoard);
        }
      }
    }

    result += 1;

    if (findPath) break;

    if (newPosLevel.length) {
      posQueue.push(newPosLevel);
      boardQueue.push(newBoardLevel);
    }
  }

  return findPath ? result : -1;
};

const switchPos = (board, startPos, targetPos) => {
  const newBoard = [...board];
  [newBoard[startPos], newBoard[targetPos]] = [newBoard[targetPos], newBoard[startPos]];

  return newBoard;
};

const POS_MOVEABLE = [
  [1, 3],
  [0, 2, 4],
  [1, 5],
  [0, 4],
  [1, 3, 5],
  [2, 4],
];
