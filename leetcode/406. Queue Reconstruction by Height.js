/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  // sort by height descending, if height is the same, sort by k ascending
  people.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return b[0] - a[0];
  });

  const n = people.length;
  let sortedIndex = 0;

  while (sortedIndex < n) {
    for (let i = sortedIndex; i > 0; i -= 1) {
      // move the i person
      // the person has i persons in front of the queue
      // and it's target is k persons in front of the queue
      const k = people[i][1];
      if (k < i) {
        [people[i], people[i - 1]] = [people[i - 1], people[i]];
      } else {
        break;
      }
    }

    sortedIndex += 1;
  }

  return people;
};

// time complexity: O(n^2)
// space complexity: O(1)
