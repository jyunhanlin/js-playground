/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  // collect all val into Object
  // transfer Object to list

  let cur = head;
  const myMap = new Map();
  let result = null,
    resultCur;

  while (cur) {
    const val = myMap.get(cur.val);
    if (val) myMap.set(cur.val, val + 1);
    else myMap.set(cur.val, 1);

    cur = cur.next;
  }

  myMap.forEach((value, key) => {
    if (value === 1) {
      const newNode = new ListNode(key);
      if (!result) {
        result = newNode;
        resultCur = result;
      } else {
        resultCur.next = newNode;
        resultCur = resultCur.next;
      }
    }
  });

  return result;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  const dummyHead = { next: head };

  let cur = dummyHead;

  while (cur.next) {
    if (cur.next.next && cur.next.val === cur.next.next.val) {
      let node = cur.next.next.next;
      while (node && cur.next.val === node.val) {
        node = node.next;
      }
      cur.next = node;
    } else {
      cur = cur.next;
    }
  }

  return dummyHead.next;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  const dummy = new ListNode();

  let p = head;
  let pUniq = dummy;
  let prevVal = 999;

  while (p) {
    if ((p.next && p.val !== p.next.val && prevVal !== p.val) || (!p.next && prevVal !== p.val)) {
      pUniq.next = p;
      pUniq = pUniq.next;
    }

    prevVal = p.val;

    p = p.next;
    pUniq.next = null;
  }

  return dummy.next;
};
