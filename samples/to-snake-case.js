function toSneakCase(input) {
  if (typeof input !== 'string') {
    throw new Error('Invalid type.')
  }

  return [...input.toLowerCase()].reduce(
    (a, c, i) => `${a}${c !== input[i] && !!i ? '_' : ''}${c}`,
    ''
  )
}

console.log(toSneakCase('createdAt'))
console.log(toSneakCase('createdUserData'))
console.log(toSneakCase('luizFelipeGonçalves'))
console.log(toSneakCase('USER'))
