const ACTIVE_CLASS = `lffg--is-active-${Date.now().toString(16)}`
const TABLE_SELECTOR = 'table.EduGridMain'
const ITEM_SELECTOR = 'table.EduGridMain td'

//
// De-normalize the given number.
//
function denormalizeNumber(value, quotes = false) {
  const num = (typeof value === 'number' ? value.toString() : value).replace(
    /\./g,
    ','
  )

  return `${quotes ? '"' : ''}${num}${quotes ? '"' : ''}`
}

//
// Normalizes the given number.
//
function normalizeNumber(value) {
  value = value.trim()

  return /^[0-9.,]+$/.test(value || '')
    ? parseFloat(value.replace(/\./g, '').replace(/,/, '.'))
    : false
}

//
// Creates the table event listeners.
//
function createTableListeners() {
  document.querySelectorAll(TABLE_SELECTOR).forEach((table) =>
    table.addEventListener('click', (event) => {
      let target = event.target

      while (!target.matches(ITEM_SELECTOR)) {
        target = target.parentNode

        if (target.matches(TABLE_SELECTOR)) {
          return
        }
      }

      // This strict false comparation is necessary.
      if (normalizeNumber((target || {}).textContent) === false) {
        return
      }

      target.classList.toggle(ACTIVE_CLASS)
    })
  )
}

//
// Clear active:
//
function clearActive() {
  document
    .querySelectorAll(`.${ACTIVE_CLASS}`)
    .forEach((el) => el.classList.remove(ACTIVE_CLASS))
}

//
// Creates the keyboard event listeners.
//
function createKeyboardListeners(type) {
  window.addEventListener('keypress', (event) => {
    const key = event.key.toUpperCase()

    if (key === 'R') {
      clearActive()
    }

    if (key === 'C') {
      const nums = [...document.querySelectorAll(`.${ACTIVE_CLASS}`)]
        .map((el) => normalizeNumber((el || {}).textContent))
        .filter((n) => n !== false)

      const sum = nums.reduce((a, c) => a + c, 0)
      const out = `A soma dos números ${nums
        .map((n) => denormalizeNumber(n, true))
        .join(', ')} é ${denormalizeNumber(sum, true)}.`

      clearActive()

      console.log('')
      console.log(out)
      void prompt(out, denormalizeNumber(sum))
      console.log('')
      console.log('-'.repeat(40))

      // eslint-disable-next-line
      ;(typeof copy === 'function' ? copy : (a) => false)(
        sum.toString().replace(/\./, ',')
      )
    }
  })
}

//
// Creates the style sheet.
//
function createStylesheet() {
  const styleEl = document.createElement('style')

  styleEl.textContent = [
    '.EduGridMain tr:hover td {',
    '  background-color: #e7e7e7;',
    '}',
    '',
    `.${ACTIVE_CLASS} {`,
    '  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);',
    '}'
  ].join('\n')

  document.head.appendChild(styleEl)
}

createTableListeners()
createKeyboardListeners()
createStylesheet()

console.clear()

console.log('-'.repeat(40))
console.log(' Pressione C para calcular. ')
console.log(' Pressione R para resetar. ')
console.log('-'.repeat(40))
