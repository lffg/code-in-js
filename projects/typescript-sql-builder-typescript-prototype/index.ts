/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-unused-expressions */

// Goal:
// ---------------------

const user = define({
  name: 'user',
  columns: ['id', 'username']
});

user.query().id;
user.query().username;
user.tableName;

// @ts-ignore
user.query().unknown; // Error 😃
// @ts-ignore
user.unknown; // Error 😃

// API:
// ---------------------

type SchemaDefinition<
  TableName extends string,
  ColumnNamesArray extends readonly string[]
> = {
  name: TableName;
  columns: ColumnNamesArray;
};

type ColumnProps<ColumnNamesArray extends readonly string[]> = {
  [columName in ColumnNamesArray[number]]: () => any;
};

type QueryBuilder<
  TableName extends string,
  ColumnNamesArray extends readonly string[]
> = {
  tableName: TableName;
} & {
  query: () => ColumnProps<ColumnNamesArray>;
};

function define<
  TableName extends string,
  ColumnNamesArray extends readonly ColumnName[],
  ColumnName extends string
>(
  schema: SchemaDefinition<TableName, ColumnNamesArray>
): QueryBuilder<TableName, ColumnNamesArray> {
  return { schema } as any;
}
