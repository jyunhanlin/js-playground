const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const calculatePercent = (value, total) => Math.round((value / total) * 100);

const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];

const removeDuplicates = (arr) => [...new Set(arr)];

const sortBy = (arr, key) => arr.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? a + 1 : a), 0);

const wait = async (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const pluck = (objs, key) => objs.map((obj) => obj[key]);

const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];
