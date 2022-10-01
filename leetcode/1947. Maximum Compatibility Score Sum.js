/**
 * @param {number[][]} students
 * @param {number[][]} mentors
 * @return {number}
 */
var maxCompatibilitySum = function (students, mentors) {
  let res = 0;
  const visited = {};

  const getScore = (s, m) => {
    let count = 0;
    for (let i = 0; i < students[s].length; i++) if (students[s][i] === mentors[m][i]) count += 1;
    return count;
  };

  const helper = (pos, score) => {
    if (pos >= students.length) {
      res = Math.max(res, score);
    } else {
      for (let i = 0; i < mentors.length; i += 1) {
        if (!visited[i]) {
          visited[i] = true;
          helper(pos + 1, score + getScore(pos, i));
          visited[i] = false;
        }
      }
    }
  };

  helper(0, 0);

  return res;
};
