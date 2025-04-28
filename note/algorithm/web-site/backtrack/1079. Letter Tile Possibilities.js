/**
 * @param {string} tiles
 * @return {number}
 */
var numTilePossibilities = function (tiles) {
  const used = new Array(tiles.length).fill(false);
  let res = 0;

  const nums = Array.from(tiles).sort();

  const backtrack = () => {
    res += 1;

    for (let i = 0; i < nums.length; i += 1) {
      if (used[i]) continue;

      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

      used[i] = true;
      backtrack();
      used[i] = false;
    }
  };

  backtrack(0);

  return res - 1;
};
