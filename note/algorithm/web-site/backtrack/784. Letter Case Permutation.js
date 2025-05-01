/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  const res = [];
  const track = [];

  const backtrack = (index) => {
    if (index === s.length) {
      res.push(track.join(''));
      return;
    }

    track.push(s[index]);
    backtrack(index + 1);
    track.pop();

    if (s[index].replace(/\d/, '')) {
      track.push(
        s[index].toUpperCase() === s[index] ? s[index].toLowerCase() : s[index].toUpperCase()
      );
      backtrack(index + 1);
      track.pop();
    }
  };

  backtrack(0);

  return res;
};
