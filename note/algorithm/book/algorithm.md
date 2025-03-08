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

```js
const removeDuplicates = (nums) => {
  if (nums.length === 0) return 0;

  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    if (nums[slow] !== nums[fast]) {
      slow += 1;
      nums[slow] = nums[fast];
    }
    fast += 1;
  }

  return slow + 1;
};
```

```js
const removeElement = (nums, val) => {
  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow += 1;
    }

    fast += 1;
  }

  return slow;
};
```

```js
const moveZeros = (nums) => {
  const len = removeElement(nums, 0);

  // append 0 the end of nums
};
```

## left and right pointer

```js
const reverseString = (str) => {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left += 1;
    right -= 1;
  }
};
```

```js
// from outer to inner
const isPalindrome = (str) => {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;

    left += 1;
    right -= 1;
  }

  return true;
};
```

```js

// from center
const palindrome = (str, left, right) => {

  while(left >= 0; && right < str.length && s[left] === s[right]) {
    left -= 1;
    right += 1;
  }

  return str.substring(left + 1, right)

}

const longestPalindrome = (str) => {
  let res = '';

  for(let i = 0; i < str.length; i += 1) {
    const s1 = palindrome(str, i, i);
    const s1 = palindrome(str, i, i + 1);

    res = res.length > s1.length ? res : s1;
    res = res.length > s2.length ? res : s2;
  }
  return res;
};
```

## presum

for the accumulate sum of some section of data

```js
const sumRange = (nums, left, right) => {
  const preSum = new Array(nums.length);
  preSum[0] = 0;

  for (let i = 1; i < nums.length; i += 1) {
    preSum[i] = nums[i - 1] + preSum[i - 1];
  }

  return preSum[right + 1] - preSum[left];
};
```

```js
const sumRegion = (matrix, x1, y1, x2, y2) => {
  const m = matrix.length;
  const n = matrix[0].length;

  const preSum = new Array(m + 1).fill().map(() => new Array(n + 1).fill(0));

  for(let i = 1; i <= m; i += 1) {
    for(let j = 1; j <=n j += 1) {
      preSum[i][j] = preSum[i - 1][j] + preSum[i][j - 1] - preSum[i - 1][j - 1] + matrix[i - 1][j - 1];
    }
  }

  return preSum[x2 + 1][y2 + 1] - preSum[x1][y2 + 1] - preSum[x2 + 1][y1] + preSum[x1][y1]
};
```

## diff

for the frequently operate(add or sub) of some section of data

```js
class Difference {
  constructor(nums) {
    const diff = [];
    diff[0] = nums[0];

    for (let i = 1; i < nums.length; i += 1) {
      diff[i] = nums[i] - nums[i - 1];
    }

    this.diff = diff;
  }

  increment(i, j, val) {
    this.diff[i] += val;
    if (j + 1 < this.diff.length) this.diff[j] += val;
  }

  result() {
    const res = [];

    res[0] = this.diff[0];
    for (let i = 1; i < this.diff.length; i += 1) {
      res[i] = res[i - 1] + diff[i];
    }

    return res;
  }
}
```

```js
// leetcode 370
const getModifiedArray = (length, updates) => {
  const nums = new Array(length).fill(0);

  const df = new Difference(nums);

  for (const update of updates) {
    const [i, j, val] = update;
    df.increment(i, j, val);
  }

  return df.result();
};
```

```js
// leetcode 1109
const corpFlightBookings = (bookings, n) => {
  const nums = new Array(n).fill(0);

  const df = new Difference(nums);

  for (const booking of bookings) {
    const [i, j, val] = booking;
    df.increment(i, j, val);
  }

  return df.result();
};
```

```js
// leetcode 1094

const carPooling = (trips, capacity) => {
  const nums = new Array(1001).fill(0);

  const df = new Difference(nums);

  for (const trip of trips) {
    const [val, i, j] = trip;

    df.increment(i, j, val);
  }

  const res = df.result();

  for (let i = 1; i < res.length; i += 1) {
    if (capacity < res[i]) return false;
  }

  return true;
};
```

## LRU

Use object to get key and value
Use doubly linked list to remove least recently

## LFU

Maintain 3 maps
key to val, key to freq, freq to key
