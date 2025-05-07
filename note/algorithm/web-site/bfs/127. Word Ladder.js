/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  wordSet.delete(beginWord);

  const queue = [beginWord];
  const visited = new Set(queue);
  let step = 1;

  while (queue.length) {
    const size = queue.length;

    for (let i = 0; i < size; i += 1) {
      const word = queue.shift();
      if (word === endWord) return step;

      const wordChars = word.split('');

      for (let j = 0; j < wordChars.length; j += 1) {
        let originChar = wordChars[j];
        for (let c = 97; c <= 122; c += 1) {
          if (String.fromCharCode(c) === originChar) continue;
          wordChars[j] = String.fromCharCode(c);

          const newWord = wordChars.join('');
          if (wordSet.has(newWord) && !visited.has(newWord)) {
            queue.push(newWord);
            visited.add(newWord);
          }
        }
        wordChars[j] = originChar;
      }
    }

    step += 1;
  }

  return 0;
};
