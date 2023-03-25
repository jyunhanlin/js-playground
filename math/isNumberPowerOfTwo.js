const isNumberPowerOfTwo = (number) => !!number && (number & (number - 1)) === 0;

console.log(isNumberPowerOfTwo(100)); // false
console.log(isNumberPowerOfTwo(128)); // true
