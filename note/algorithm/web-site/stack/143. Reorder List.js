/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  const stack = [];

  let p = head;
  while (p) {
    stack.push(p);
    p = p.next;
  }

  p = head;

  while (p) {
    const lastNode = stack.pop();
    let next = p.next;

    if (lastNode === next || lastNode.next === next) {
      lastNode.next = null;
      break;
    }

    p.next = lastNode;
    lastNode.next = next;
    p = next;
  }
};
