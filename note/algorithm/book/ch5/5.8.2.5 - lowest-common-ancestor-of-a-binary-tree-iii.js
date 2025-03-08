const lowestCommonAncestor = (p, q) => {
  let a = p;
  let b = q;

  while (a !== b) {
    a = a ? a.parent : q;
    b = b ? b.parent : p;
  }

  return a;
};
