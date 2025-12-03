```js
// add
(a + b) % k === ((a % k) + (b % k)) % k

// sub
(a - b + k) % k === ((a % k) - (b % k) + k) % k

// mul
(a _ b) % k === ((a % k) _ (b % k)) % k

// div
(a / b) % k === ((a % k) / (b % k)) % k
```
