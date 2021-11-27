var constructFromPrePost = function (pre, post) {
  return prePostTreeBuilder(0, pre.length - 1, 0, post.length - 1);

  function prePostTreeBuilder(preStart, preEnd, postStart, postEnd) {
    if (preStart > preEnd) return null;

    const root = new TreeNode(pre[preStart]);
    if (preStart == preEnd) return root;

    const leftVal = pre[preStart + 1];
    let leftPostIndex;

    for (leftPostIndex = postStart; leftPostIndex <= postEnd; leftPostIndex++) {
      if (post[leftPostIndex] === leftVal) break;
    }

    const leftTreeSize = leftPostIndex - postStart;

    const preLeftStart = preStart + 1;
    const preLeftEnd = preLeftStart + leftTreeSize;
    const leftPostStart = postStart;
    const leftPostEnd = leftPostIndex;

    const preRightStart = preLeftEnd + 1;
    const preRightEnd = preEnd;
    const postRightStart = leftPostIndex + 1;
    const postRightEnd = postEnd - 1;

    root.left = prePostTreeBuilder(preLeftStart, preLeftEnd, leftPostStart, leftPostEnd);
    root.right = prePostTreeBuilder(preRightStart, preRightEnd, postRightStart, postRightEnd);

    return root;
  }
};

var constructFromPrePost = function (pre, post) {
  let i = 0;

  function callDFS(arr) {
    if (!arr.length) return null;
    const node = pre[i++];
    const idx = arr.indexOf(pre[i]);
    const tree = new TreeNode(node);
    tree.left = callDFS(arr.slice(0, idx + 1));
    tree.right = callDFS(arr.slice(idx + 1, arr.indexOf(node)));
    return tree;
  }
  return callDFS(post);
};
