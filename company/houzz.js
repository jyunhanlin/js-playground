var a = (function (y, x) {
  var x = null;

  return {
    foo: function (x) {
      return this.bar(x * y);
    },
    bar: function (x) {
      return x + y;
    },
  };
})(3, 4);

console.log(a.foo(2));

const url = new URL('http://www.mysite.com/processDoc?type=word&author=peter&pages=50');

const obj = {};

for (param of url.searchParams) {
  obj[param[0]] = param[1];
}

console.log(obj);

const targetUrlList = [
  'https://www.youtube.com/watch?v=FbqBv7Tz1QY&list=RDFbqBv7Tz1QY&start_radio=1&ab_channel=%E5%91%A8%E6%9D%B0%E5%80%ABJayChou',
  'http://www.mysite.com/processDoc?type=word&type=pdf&type=excel&author=peter&pages=50',
];

console.log(
  targetUrlList.map((urlList) => {
    const url = new URL(urlList);

    const obj = {};

    for (param of url.searchParams) {
      obj[param[0]] = param[1];
    }

    return obj;
  })
);

const TargeArrayList = [
  [0],
  [1, [2]],
  [1, [2], 3, [4, 5], [6, 7, [8, 9, [10]]]],
  [[[1, 2, [3], [4], [5], [6, [7]]]]],
];

function flattenDeep(arr1) {
  return arr1.reduce(
    (acc, val) => (Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val)),
    []
  );
}

const flat = () => {
  const result = [];

  for (let i = 0; i < TargeArrayList.length; i += 1) {
    const curList = TargeArrayList[i];
    result.push(flattenDeep(curList));
  }

  return result;
};

console.log(flat());

// [[0], [1, 2], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7]];

for (var i = 0; i < 5; i++) {
  setTimeout(function (i) {
    console.log(this.i);
  }, 100);
}

const urls = ['http://xxx.com?a=x&b=y', 'http://xxx.com?a=z'];

console.log(
  urls.reduce((acc, cur) => {
    const url = new URL(cur);

    for (param of url.searchParams) {
      if (Array.isArray(acc[param[0]])) acc[param[0]].push(param[1]);
      else if (acc[param[0]]) acc[param[0]] = [acc[param[0]], param[1]];
      else acc[param[0]] = param[1];
    }
    return acc;
  }, {})
);

/*

Create a sum function that will calculate the sum of arguments. if there aren’t any arguments, return the result, if there are any arguments, return a function that can be used for the next calculation.
For example,
sum() // return 0;
sum(1)() // return 1;
sum(1, 1, 1)() // return 3;
sum(1)(1)(1)() // return 3;
sum(1)(1, 1, 1, 1)(1)() // return 6
sum(1) // return a function
sum(1)…….(1, 1, 1,…1) // return a function
*/

function sum(...a) {
  if (!a.length) return 0;

  let count = a.length;

  const f = (...b) => {
    if (!b.length) return count;
    count += b.length;
    return f;
  };

  return f;
}

console.log(
  sum(), // return 0;
  sum(1)(), // return 1;
  sum(1, 1, 1)(), // return 3;
  sum(1)(1)(1)(), // return 3;
  sum(1)(1, 1, 1, 1)(1)() // return 6
);
