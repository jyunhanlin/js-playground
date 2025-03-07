/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  if (!lists.length) return null;

  const dummy = new ListNode();
  let p = dummy;

  const queue = new PriorityQueue((a, b) => a.val - b.val);

  for (const head of lists) {
    if (head) queue.push(head);
  }

  while (queue.size()) {
    const node = queue.pop();

    p.next = node;
    if (node.next) queue.push(node.next);
    p = p.next;
  }

  return dummy.next;
};
