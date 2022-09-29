// refer: https://replit.com/@ZhangMYihua/Palindrome-Partitioning#index.js

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const res = [];

  const isPalindrome = (start, end) => {
    while (start < end) {
      if (s[start] !== s[end]) return false;

      start++;
      end--;
    }
    return true;
  };

  const helper = (startingIdx, S, partialSplits) => {
    if (startingIdx === S.length) {
      res.push([...partialSplits]);
    } else {
      for (let i = startingIdx; i < S.length; i += 1) {
        if (isPalindrome(startingIdx, i, S)) {
          const palindromeSnippet = S.slice(startingIdx, i + 1);
          partialSplits.push(palindromeSnippet);

          helper(i + 1, S, partialSplits);
          partialSplits.pop();
        }
      }
    }
  };

  helper(0, s, []);

  return res;
};
