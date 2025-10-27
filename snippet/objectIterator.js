// 讓普通物件可以被迭代（解構、for...of 等）
// 原理：為 Object.prototype 添加 Symbol.iterator 方法
Object.prototype[Symbol.iterator] = function () {
  // 返回物件值的陣列迭代器
  // Object.values(this) 取得所有值 [1, 2]
  // 再調用陣列的 [Symbol.iterator]() 返回迭代器
  return Object.values(this)[Symbol.iterator]();
};

// 現在物件可以使用陣列解構語法
// a = 1（第一個值）, b = 2（第二個值）
const [x, y] = { a: 1, b: 2 };

console.log(x, y); // 輸出: 1 2
