var minOpsToMagicTree = function (values, edges) {
  // create the tree;
  const tree = [];

  for (const [u, v] of edges) {
    let parent = u > v ? v : u;
    let child = u > v ? u : v;

    if (!tree[parent]) tree[parent] = [];
    tree[parent].push(child);
  }

  // post order
  let ops = 0;
  const traverse = (node) => {
    if (!tree[node]) return;

    for (const child of tree[node]) {
      traverse(child);
    }

    let value = 0;
    for (const child of tree[node]) {
      value += values[child - 1];
    }

    if (value > values[node - 1]) {
      ops += value - values[node - 1];
      values[node - 1] = value;
    }
  };

  traverse(1);

  return ops;
};

// time complexity: O(n)
// space complexity: O(n)
