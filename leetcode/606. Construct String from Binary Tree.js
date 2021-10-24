/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string}
 */
var tree2str = function (root) {
  let result = `${root.val}`;

  const traversal = (cur) => {
    let leftStr = '';
    let rightStr = '';
    if (cur.left) {
      leftStr += traversal(cur.left);
    } else if (!cur.left && cur.right) {
      rightStr += '()';
    }

    if (cur.right) {
      rightStr += traversal(cur.right);
    }

    return `(${cur.val}${leftStr}${rightStr})`;
  };

  if (root.left) {
    result += traversal(root.left);
  } else if (!root.left && root.right) {
    result += '()';
  }

  if (root.right) {
    result += traversal(root.right);
  }

  return result;
};

var tree2str = function (t) {
  if (!t) return '';

  const left = tree2str(t.left);
  const right = tree2str(t.right);

  // omit printing empty right node in the string
  if (right) return `${t.val}(${left})(${right})`;
  else if (left) return `${t.val}(${left})`;
  else return `${t.val}`;
};
