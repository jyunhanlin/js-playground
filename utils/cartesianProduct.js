const cartesianProduct = (a, b) => a.reduce((p, x) => [...p, ...b.map((y) => [x, y])], []);

cartesianProduct(['x', 'y'], [1, 2]);
// [['x', 1], ['x', 2], ['y', 1], ['y', 2]]
