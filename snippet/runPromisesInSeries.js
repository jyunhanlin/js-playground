const runPromisesInSeries = (ps) => ps.reduce((p, next) => p.then(next), Promise.resolve());

const delay = (d) => new Promise((r) => setTimeout(r, d));
runPromisesInSeries([() => delay(1000), () => delay(2000)]);
// Executes each promise sequentially, taking a total of 3 seconds to complete
