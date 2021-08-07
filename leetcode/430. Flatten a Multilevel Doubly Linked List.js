/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function (head) {
  if (!head) return head;
  let cur = head;

  while (cur) {
    if (!cur.child) cur = cur.next;
    else {
      let childHead = cur.child;
      const oriNext = cur.next;

      cur.next = childHead;
      childHead.prev = cur;

      while (childHead.next) {
        childHead = childHead.next;
      }

      if (oriNext) {
        oriNext.prev = childHead;
        childHead.next = oriNext;
      }
      cur.child = null;
    }
  }

  return head;
};

// from course

var flatten = function (head) {
  if (!head) return head;

  let currentNode = head;
  while (currentNode !== null) {
    if (currentNode.child === null) {
      currentNode = currentNode.next;
    } else {
      let tail = currentNode.child;
      while (tail.next !== null) {
        tail = tail.next;
      }

      tail.next = currentNode.next;
      if (tail.next !== null) {
        tail.next.prev = tail;
      }

      currentNode.next = currentNode.child;
      currentNode.next.prev = currentNode;
      currentNode.child = null;
    }
  }

  return head;
};
