//
// A helper that composes N-functions into a single one.
//
// The given functions will be executed right-to-left. For example:
//
//    compose(a, b, c);
//
// The `c` function will be the first executed, then `b`, and finally `a`.
// You can also compose functions that will be executed left-to-right, but that
// helper is usually called `pipe`.
//
// For more info, see:
//  - https://ramdajs.com/docs/#compose
//  - https://ramdajs.com/docs/#pipe
//

const compose = (...fns) =>
  fns.reduceRight(
    (result, fn) => (...args) => fn(result(...args)),
    (value) => value
  );

//
// Functions that we'll compose:
//

const addTwo = (num) => num + 2;
const stringify = (num) => `The number is: ${num}.`;
const toUpper = (str) => str.toUpperCase();

//
// Example:
//

// In the next example, the function `addTwo` will be the first executed when we
// invoke the `composed` function. Then, the `stringify` one will be called, and
// finally, the `toUpper` one (right-to-left).
const composed = compose(
  toUpper, //     3 (last)
  stringify, //   2
  addTwo //       1 (first)
);

console.log(composed(5)); // THE NUMBER IS: 7.
console.log(composed(3)); // THE NUMBER IS: 5.
