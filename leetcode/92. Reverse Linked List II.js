function reverseList(head, k = Infinity) {
  if (!head) return null;
  let currNode = head;
  let prevNode = null;
  let nextNode = null;
  while (currNode && --k > -1) {
    nextNode = currNode.next;
    currNode.next = prevNode;
    prevNode = currNode;
    currNode = nextNode;
  }
  return prevNode;
}

/**
 * @param {ListNode} startNode
 * @param {number} length
 * @return {ListNode}
 */
const reverse = (startNode, length) => {
  let currentIndex = 0;
  const current = startNode;
  const result = new ListNode();

  const last = new ListNode(current.val, null);

  while (currentIndex !== length) {
    const node = new ListNode();
  }
};

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  let startNode = head;
  let cur = head;
  let i = 1;

  // find left node
  while (i < left) {
    startNode = cur;
    cur = cur.next;
    i += 1;
  }

  let pre,
    tail = cur;

  while (i <= right) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
    i += 1;
  }

  startNode.next = prev;
  tail.next = cur;
  return left === 1 ? prev : head;
};
