/* eslint-disable no-unused-expressions */

// Goal:
// ---------------------

const idColumn: Column = {} as any;
const usernameColumn: Column = {} as any;

concat(idColumn, "-", usernameColumn);

// @ts-expect-error here
<<<<<<< HEAD
concat(() => {}, '-', idColumn);
=======
concat(() => {}, "-", idColumn);
>>>>>>> 54d379986f0e26ccfdd83318a8300b4defa07008

// API:
// ---------------------

const TYPE__COLUMN = Symbol("TYPE__COLUMN");

type ColumnFunction = () => Record<string, unknown>;
type Column = ColumnFunction & {
  $$type: typeof TYPE__COLUMN;
};

function concat(...args: Array<Column | string>) {
  return args;
}
