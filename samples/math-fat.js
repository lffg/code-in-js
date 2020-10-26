/*global BigInt*/

function fat(n, pretty = false, locale) {
  if (typeof n !== 'number' || n >= Number.MAX_SAFE_INTEGER) {
    throw new RangeError('Invalid number');
  }

  if (n <= 1) {
    return 1n;
  }

  let currentTotal = 1n;
  let currentNumber = BigInt(n);

  while (currentNumber !== 1n) {
    currentTotal *= currentNumber;
    currentNumber = currentNumber - 1n;
  }

  if (pretty && typeof BigInt.toLocaleString === 'function') {
    return currentTotal.toLocaleString(locale);
  }

  return currentTotal;
}

console.log(fat(10));
