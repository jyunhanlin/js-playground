/**
 * @param {string} word
 * @return {number}
 */
var removeAlmostEqualCharacters = function (word) {
  const n = word.length; // Length of the given word

  let ans = 0; // Initialize the answer counter
  let k = 0; // Initialize pointer for iteration

  while (k < n - 1) {
    // Check if characters at position k and k+1 are equal or almost equal
    if (
      word[k] === word[k + 1] ||
      Math.abs(word[k].charCodeAt(0) - word[k + 1].charCodeAt(0)) === 1
    ) {
      ans++; // Increment the counter for almost equal characters
      k++; // Move to the next character after handling the pair
    }
    k++; // Move to the next character for comparison
  }

  return ans; // Return the total count of almost equal characters
};
