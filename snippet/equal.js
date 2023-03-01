console.log('NaN === NaN:', NaN === NaN); // false
console.log('isNaN(NaN):', isNaN(NaN)); // true
console.log('Number.isNaN(NaN):', Number.isNaN(NaN)); // true
console.log('isNaN("aaa"):', isNaN('aaa')); // true, coercion
console.log('Number.isNaN("aaa"):', Number.isNaN('aaa')); // false, no coercion
console.log('[NaN].indexOf(NaN):', [NaN].indexOf(NaN)); // -1
console.log('[NaN].lastIndexOf(NaN):', [NaN].lastIndexOf(NaN)); // -1
console.log('[NaN].includes(NaN):', [NaN].includes(NaN)); // true, SameValueZero
console.log('new Set([NaN, NaN]):', new Set([NaN, NaN])); // Set(1) { NaN }, SameValueZero
console.log(
  'new Map([[NaN, 1], [NaN, 2],]):',
  new Map([
    [NaN, 1],
    [NaN, 2],
  ])
); // Map(1) { NaN => 2 }, SameValueZero
console.log('Object.is(NaN, NaN):', Object.is(NaN, NaN)); // true, SameValueZero

console.log('Object.is(+0, -0):', Object.is(+0, -0)); // false, SameValueZero, +0 is not equal -0
console.log('+0 === -0:', +0 === -0); // true
console.log('[0].includes(-0):', [0].includes(-0)); // true
console.log(
  '[0].find((val) => Object.is(val, -0)):',
  [0].find((val) => Object.is(val, -0))
); // undefined
