const lowestCommonAncestor = (root, nodes) => {
  const find = (root) => {
    if (!root) return null;

    if (nodes.includes(root.val)) return root;

    const left = find(root.left);
    const right = find(root.right);

    if (left && right) return root;

    return left ? left : right;
  };

  return find(root);
};
