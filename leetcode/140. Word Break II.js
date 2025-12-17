/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  const res = [];
  const track = [];

  const backtrack = (i) => {
    if (i === s.length) {
      res.push(track.join(' '));
      return;
    }

    for (const word of wordDict) {
      if (i + word.length > s.length) continue;
      if (s.substring(i, i + word.length) !== word) continue;

      track.push(word);
      backtrack(i + word.length);
      track.pop();
    }
  };

  backtrack(0);

  return res;
};

// Time Complexity: O(n^2 * m)
// Space Complexity: O(n)
