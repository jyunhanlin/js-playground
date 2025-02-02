const lowestCommonAncestor = (root, p, q) => {
  let findP = false;
  let findQ = false;
  const find = (root) => {
    if (!root) return null;

    const left = find(root.left);
    const right = find(root.right);

    if (left && right) return root;

    if (root.val === p.val) {
      findP = true;
      return root;
    }

    if (root.val === q.val) {
      findQ = true;
      return root;
    }

    if (left && right) return root;

    return left ? left : right;
  };

  const node = find(root);

  if (findP && findQ) return node;

  return null;
};
