/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const isPalindrome = (start, end) => {
    while (start < end) {
      if (s[start] !== s[end]) return false;

      start++;
      end--;
    }
    return true;
  };

  const res = [];
  const track = [];

  const backtrack = (start) => {
    if (start === s.length) {
      res.push([...track]);
      return;
    }

    for (let i = start; i < s.length; i++) {
      if (!isPalindrome(start, i)) continue;

      track.push(s.substring(start, i + 1));

      backtrack(i + 1);
      track.pop();
    }
  };

  backtrack(0);

  return res;
};
