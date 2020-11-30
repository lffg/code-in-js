const SELECTOR = '#ctl27_xgvNotasFilial_DXMainTable > tbody .dxgvDataRow_Edu';

const extract = ($el) => parseFloat($el.textContent.replace(/,/, '.'));

console.table(
  [...document.querySelectorAll(SELECTOR)].map((el) => {
    const [, , , disc, , $e1, $e2] = el.children;
    const e1 = extract($e1);
    const e2 = extract($e2);
    const e3 = 4.9;

    return {
      Disciplina: disc.textContent.trim(),
      '1ª Etapa': e1,
      '2ª Etapa': e2,
      '3ª Etapa': e3,
      Total: (e1 * 10 + e2 * 10 + e3 * 10) / 10
    };
  })
);
