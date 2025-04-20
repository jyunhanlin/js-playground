/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  let len = 0;

  let p = head;

  while (p) {
    len += 1;
    p = p.next;
  }

  let cur = head;
  const build = (left, right) => {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);

    const leftTree = build(left, mid - 1);

    const root = new TreeNode(cur.val);
    cur = cur.next;

    const rightTree = build(mid + 1, right);

    root.left = leftTree;
    root.right = rightTree;

    return root;
  };

  return build(0, len - 1);
};
