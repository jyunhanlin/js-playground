```js
// add
(a + b) % k === ((a % k) + (b % k)) % k;
```

```js
// sub
(a - b + k) % k === ((a % k) - (b % k) + k) % k;
```

```js
// mul
(a * b) % k === ((a % k) * (b % k)) % k;
```
