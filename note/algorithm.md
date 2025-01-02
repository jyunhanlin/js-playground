# Dynamic programming

```js
//  top down
const dp = (...options) => {
  for (i ...) {
    result = max(result, dp(...otherOptions)) // or min
  }

  return result;
}


// bottom up

dp[0][0][...] = base case

for (i...) {
  for (j...) {
    for ... {
      dp[i][j][...] = max(option1, option2, ...) // or min
    }
  }
}
```

# Backtracking

```js
result = [];

const backtrack = (...) => {
  if (fulfill) {
    result.push(path);
    return;
  }


  for (...) {
    select
    backtrack(...)
    de-select
  }
}
```

# BFS

# Binary tree

# Binary search

# Slide window

```js
const slideWindow = (str) => {
  const win = new Set();

  let left = 0;
  let right = 0;

  while (left < right && right < s.length) {
    win.add(str[right]);
    right += 1;

    // do something for the win

    while(left < right && win needs shrink) {
      win.remove(str[left]);
      left += 1;

      // do something for the win
    }
  }
};
```

# Array, Linked List

## Merge 2 Linked List

Create a dummy node to simply the connection between nodes.

## Merge K order Linked list

Use min heap

## Remove Nth Node From End of Linked list

Create 2 nodes, p1 goes k step first, and then p1 and p2 start together

```
P2 - - - P1 - - - - - - - - - - - -
     K              n - k

- - - - - - - - - - - - - P2 - - P1
                          K
```

## Middle of the Linked List

Use slow and fast 2 nodes -> slow = slow.next, fast = fast.next.next,
then the slow will be the middle of the Linked list

## Circular of the Linked List

Use the same way as Middle of the Linked List, when the slow === fast => there is circular

### How to find the start of the circular

When slow === fast -> slow = head -> slow = slow.next, fast = fast.next,
when slow === fast, slow is the start of the circular (k -m)

## Intersection of the 2 Linked List

```js
(p1 = headA), (p2 = headB);
while (p1 !== p2) {
  if (p1 === null) p1 = headB;
  else p1 = p1.next;

  if (p2 === null) p2 = headA;
  else p2 = p2.next;
}

return p1;
```

## slow and fast pointer for array

## presum

for the accumulate sum of some section of data

## diff

for the frequently operate(add or sub) of some section of data
