/**
 * @param {number[]} deck
 * @return {number[]}
 */
var deckRevealedIncreasing = function (deck) {
  const n = deck.length;
  deck.sort((a, b) => a - b);

  const res = [];

  for (let i = n - 1; i >= 0; i -= 1) {
    if (res.length) {
      res.unshift(res.pop());
    }

    res.unshift(deck[i]);
  }

  return res;
};
