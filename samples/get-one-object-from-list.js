// 14/12/2018

const example = [
  {
    name: 'Xii Jin Ping',
    age: 6500,
    gender: 'M'
  },
  {
    name: 'Donald Trump',
    age: 1,
    gender: 'M'
  },
  {
    name: 'Theresa May',
    age: 75,
    gender: 'F'
  },
  {
    name: 'Jair Bolsonaro',
    age: 67,
    gender: 'M'
  },
  {
    name: 'Angela Merkel',
    age: 600,
    gender: 'F'
  }
];

function get(array) {
  return array
    .filter(({ gender }) => gender === 'F')
    .sort(({ age: a }, { age: b }) => (a < b ? 1 : a > b ? -1 : 0))[0];
}

console.log(get(example));
