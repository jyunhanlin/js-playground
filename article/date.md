# Date

## `YYYY-MM-DD` did not compatible in Safari

```js
new Date('2023-1-1');
```

## month is 0-index

```js
new Date(2023, 1, 1);
// Wed Feb 01 2023 00:00:00 GMT+0800
```

## When the year is smaller than 100

```js
new Date(2023, 1, 1);
// Wed Feb 01 2023 00:00:00 GMT+0800

new Date(50, 2, 1);
// Wed Mar 01 1950 00:00:00 GMT+0800

new Date('0050-02-01');
// Tue Feb 01 0050 08:06:00 GMT+0806

new Date('0050-02-01 00:00:00');
// Wed Feb 01 1950 00:00:00 GMT+0800

new Date('10-11-12');
// Thu Oct 11 2012 00:00:00 GMT+0800
```

## different format with different timezone

```js
new Date('2018-01-01');
// Mon Jan 01 2018 08:00:00 GMT+0800

new Date('2018/01/01');
// Mon Jan 01 2018 00:00:00 GMT+0800
```
