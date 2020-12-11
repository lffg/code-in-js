const arr1 = [
  ['name', 'id', 'age', 'weight', 'Cool'],
  ['Susan', '3', '20', '120', true],
  ['John', '1', '21', '150', true],
  ['Bob', '2', '23', '90', false],
  ['Ben', '4', '20', '100', true]
];

const arr2 = [
  ['name', 'id', 'height'],
  ['Bob', '2', '50'],
  ['John', '1', '45'],
  ['Ben', '4', '43'],
  ['Susan', '3', '48']
];

const arr3 = [
  ['name', 'id', 'parent'],
  ['Bob', '2', 'yes'],
  ['John', '1', 'yes']
];

function merge(arrs, aggregator = 'id') {
  const map = Object.create(null);

  for (const arr of arrs) {
    const [header, ...body] = arr;

    for (const entry of body) {
      const obj = entry.reduce(
        (acc, curr, currIndex) =>
          Object.assign(acc, {
            [header[currIndex]]: curr
          }),
        {}
      );

      if (!map[obj[aggregator]]) map[obj[aggregator]] = {};
      Object.assign(map[obj[aggregator]], obj);
    }
  }

  return Object.values(map);
}
