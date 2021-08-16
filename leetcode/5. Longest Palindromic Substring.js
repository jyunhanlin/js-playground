/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let start = 0,
    end = 0;
  for (i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(s, i, i);
    let len2 = expandAroundCenter(s, i, i + 1);
    let len = Math.max(len1, len2);
    if (len > end - start) {
      start = Math.ceil(i - (len - 1) / 2);
      end = Math.floor(i + len / 2);
    }
  }
  return s.substring(start, end + 1);
};

function expandAroundCenter(s, left, right) {
  let L = left,
    R = right;
  while (L >= 0 && R < s.length && s.charAt(L) === s.charAt(R)) {
    L--;
    R++;
  }

  return R - L - 1;
}

// my way
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length < 2) return s[0];

  let max = 1;
  let maxPos = [0, 0];

  for (let i = 0; i < s.length; i += 1) {
    if (max < s.length - i) {
      let end = i;

      while (end < s.length) {
        if (isValid(s, i, end)) {
          if (end - i + 1 > max) {
            max = end - i + 1;
            maxPos = [i, end];
          }
        }
        end++;
      }
    }
  }

  return s.substring(maxPos[0], maxPos[1] + 1);
};

const isValid = (s, start, end) => {
  let left = start,
    right = end;

  while (left <= right) {
    if (s[left] === s[right]) {
      left++;
      right--;
    } else {
      return false;
    }
  }

  return true;
};
