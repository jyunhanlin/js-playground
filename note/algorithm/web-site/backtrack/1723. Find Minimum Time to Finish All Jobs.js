/**
 * @param {number[]} jobs
 * @param {number} k
 * @return {number}
 */
var minimumTimeRequired = function (jobs, k) {
  const workloads = new Array(k).fill(0);

  let res = Infinity;

  const backtrack = (index) => {
    if (index === jobs.length) {
      res = Math.min(res, Math.max(...workloads));
      return;
    }

    const chosen = new Set();

    for (let i = 0; i < workloads.length; i += 1) {
      if (workloads[i] + jobs[index] > res) continue;

      if (chosen.has(workloads[i])) continue;

      chosen.add(workloads[i]);
      workloads[i] += jobs[index];
      backtrack(index + 1);
      workloads[i] -= jobs[index];
    }
  };

  backtrack(0);

  return res;
};
