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

create a dummy node to simply the connection between nodes.

## Merge K order Linked list

Use min heap

## Remove Nth Node From End of Linked list

create 2 nodes...
