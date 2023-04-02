/**
 * @param {number[][]} clips
 * @param {number} time
 * @return {number}
 */

var videoStitching = function (clips, time) {
  const len = clips.length;

  clips.sort((a, b) => a[0] - b[0]);

  let stitchingStart = 0;
  let stitchingEnd = 0;
  let res = 0;
  let index = 0;

  while (stitchingStart < time) {
    while (index < len && clips[index][0] <= stitchingStart) {
      stitchingEnd = Math.max(stitchingEnd, clips[index][1]);
      index++;
    }
    if (stitchingStart == stitchingEnd) return -1;

    res++;
    stitchingStart = stitchingEnd;
  }

  return res;
};

// wrong
var videoStitching = function (clips, time) {
  const sortedClips = clips.slice().sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });
  console.log(sortedClips);

  let res = 1;
  let maxStart = sortedClips[0][0];
  let start = sortedClips[0][0];
  let end = sortedClips[0][1];

  for (let i = 1; i < sortedClips.length; i += 1) {
    const last = sortedClips[i - 1];
    const lastStart = last[0];
    const lastEnd = last[1];
    const next = sortedClips[i];
    const nextStart = next[0];
    const nextEnd = next[1];

    if (lastEnd < nextStart) break;

    if (
      ((lastStart === nextStart && start === nextStart) || maxStart === nextStart) &&
      nextEnd > end
    ) {
      console.log('move', next, start, end);
      start = Math.max(lastStart, nextStart, start);
      end = nextEnd;
    } else if (end > nextStart && nextEnd > end) {
      console.log('add', next, start, end);

      start = Math.max(lastStart, nextStart, start);
      maxStart = Math.max(lastEnd, start, maxStart);
      end = nextEnd;
      res += 1;
    }

    if (end >= time) break;
  }

  return end >= time ? res : -1;
};
