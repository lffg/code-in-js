/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-unused-expressions */

// Goal:
// ---------------------

const idColumn: Column = {} as any;
const usernameColumn: Column = {} as any;

concat(idColumn, '-', usernameColumn);

// @ts-ignore
concat(() => {}, '-', idColumn);

// API:
// ---------------------

const TYPE__COLUMN = Symbol('TYPE__COLUMN');

type ColumnFunction = () => {};
type Column = ColumnFunction & {
  $$type: typeof TYPE__COLUMN;
};

function concat(...args: Array<Column | string>) {
  return args;
}
