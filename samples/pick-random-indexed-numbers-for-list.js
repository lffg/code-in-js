function pickRandomNumbersForList(list, numbersForListItem = 1) {
  const itemsManagerMap = arrToMap(list, 0);

  const total = list.length * numbersForListItem;
  const itemsList = Array.from({ length: total }).map((_, index) => index + 1);

  const final = arrToMap(itemsList, null);

  while (itemsList.length) {
    const itemIndex = sortIndex(list);
    const item = list[itemIndex];

    itemsManagerMap[item]++;

    if (itemsManagerMap[item] === numbersForListItem) {
      list.splice(itemIndex, 1);
    }

    const positionIndex = sortIndex(itemsList);

    final[itemsList[positionIndex]] = item;
    itemsList.splice(positionIndex, 1);
  }

  return final;
}

// HELPER FUNCTIONS
// ================

function arrToMap(arr, defaultValue = null) {
  const map = {};
  for (const val of arr) map[val] = defaultValue;
  return map;
}

function sortIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function sort(arr) {
  return arr[sortIndex(arr)];
}
