const HIGHLIGHT_CLASS = `lffg--is-highlighted-${Date.now().toString(16)}`;
const ACTIVE_CLASS = `lffg--is-active-${Date.now().toString(16)}`;
const TABLE_SELECTOR = 'table.EduGridMain';
const ITEM_SELECTOR = 'table.EduGridMain td';

//
// De-normalizes the given number.
//
function denormalizeNumber(value, quotes = false) {
  const num = (typeof value === 'number' ? value.toString() : value).replace(
    /\./g,
    ','
  );

  return `${quotes ? '"' : ''}${num}${quotes ? '"' : ''}`;
}

//
// Normalizes the given number.
//
function normalizeNumber(value) {
  const num = value.trim();

  return /^[0-9.,]+$/.test(num || '')
    ? parseFloat(num.replace(/\./g, '').replace(/,/, '.'))
    : false;
}

//
// Creates the table event listeners.
//
function createTableListeners() {
  document.querySelectorAll(TABLE_SELECTOR).forEach((table) =>
    table.addEventListener('click', (event) => {
      let target = event.target;

      while (!target.matches(ITEM_SELECTOR)) {
        target = target.parentNode;

        if (target.matches(TABLE_SELECTOR)) {
          return;
        }
      }

      // This strict false comparation is necessary.
      if (normalizeNumber((target || {}).textContent) === false) {
        return;
      }

      target.classList.toggle(ACTIVE_CLASS);
    })
  );
}

//
// Clear active:
//
function clearActive() {
  document
    .querySelectorAll(`.${ACTIVE_CLASS}`)
    .forEach((el) => el.classList.remove(ACTIVE_CLASS));
}

//
// Creates the keyboard event listeners.
//
function createKeyboardListeners() {
  window.addEventListener('keypress', (event) => {
    const key = event.key.toUpperCase();

    if (key === 'R') {
      clearActive();
    }

    if (key === 'C') {
      const nums = [...document.querySelectorAll(`.${ACTIVE_CLASS}`)]
        .map((el) => normalizeNumber((el || {}).textContent))
        .filter((n) => n !== false);

      const sum = nums.reduce((a, c) => a + c, 0);
      const out = `A soma dos números ${nums
        .map((n) => denormalizeNumber(n, true))
        .join(', ')} é ${denormalizeNumber(sum, true)}.`;

      clearActive();

      console.log('');
      console.log(out);
      void prompt(out, denormalizeNumber(sum));
      console.log('');
      console.log('-'.repeat(40));

      // eslint-disable-next-line
      ;(typeof copy === 'function' ? copy : (a) => false)(
        sum.toString().replace(/\./, ',')
      );
    }
  });
}

//
// Highlights "done" elements:
//
function highlightDone() {
  const TARGET_REGEX = /3(0|5),0( \n)*?/;

  [...document.querySelectorAll(ITEM_SELECTOR)]
    .filter((el) => TARGET_REGEX.test((el || {}).textContent))
    .forEach((el) => el.classList.toggle(HIGHLIGHT_CLASS));
}

//
// Creates the style sheet.
//
function createStylesheet() {
  const styleEl = document.createElement('style');

  styleEl.textContent = [
    '.EduGridMain tr:hover td {',
    '  background-color: #e7e7e7;',
    '}',
    '',
    `.${ACTIVE_CLASS} {`,
    '  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);',
    '}',
    '',
    `.${HIGHLIGHT_CLASS} {`,
    '  box-shadow: inset 0 0 5px #673ab7;',
    '}'
  ].join('\n');

  document.head.appendChild(styleEl);
}

createTableListeners();
createKeyboardListeners();
highlightDone();
createStylesheet();

console.clear();

console.log('-'.repeat(40));
console.log(' Pressione C para calcular. ');
console.log(' Pressione R para resetar. ');
console.log('-'.repeat(40));
