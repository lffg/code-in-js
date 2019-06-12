/**
 * @see https://pt.stackoverflow.com/questions/5160/como-calcular-a-idade-de-uma-pessoa-com-js-a-partir-da-data-de-nascimento#answer-5162
 */

function getAge(birth) {
  const current = new Date();
  let diff = current.getFullYear() - birth.getFullYear();

  if (
    new Date(current.getFullYear(), current.getMonth(), current.getDate()) <
    new Date(current.getFullYear(), birth.getMonth(), birth.getDate())
  )
    diff--;

  return diff;
}

console.log(getAge(new Date(2000, 10, 20)));
