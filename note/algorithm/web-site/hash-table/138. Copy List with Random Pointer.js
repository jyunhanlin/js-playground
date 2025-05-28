/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function (head) {
  const clone = new Map();

  let p = head;
  while (p) {
    if (!clone.has(p)) {
      clone.set(p, new Node(p.val));
    }
    p = p.next;
  }

  p = head;
  while (p) {
    if (p.next) {
      clone.get(p).next = clone.get(p.next);
    }

    if (p.random) {
      clone.get(p).random = clone.get(p.random);
    }

    p = p.next;
  }

  return clone.get(head);
};
