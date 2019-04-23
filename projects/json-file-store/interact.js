const { promisify } = require('util')
const path = require('path')
const fs = require('fs')

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

/**
 * Check if the given type is absolute.
 *
 * @param  {string} p
 * @return {boolean}
 *
 * @throws {Error} If the path isn't absolute.
 *
 * @private
 */
function checkPath(p) {
  if (path.isAbsolute(p)) {
    return true
  }

  throw new Error(`The path "${p}" must be absolute.`)
}

/**
 * Assert the type of a given value.
 *
 * @param  {any} value
 * @param  {string} type
 * @return {boolean}
 *
 * @throws {Error} If the value is not of the given type.
 *
 * @private
 */
function checkType(value, type) {
  if (typeof value === type) {
    return true
  }

  throw new TypeError('Invalid type.')
}

/**
 * Sets a new value for the document.
 *
 * @param  {string} p
 * @param  {string} value
 * @param  {any} options
 * @return {Promise<void>}
 *
 * @public
 */
async function setValue(p, value, options = 'utf8') {
  checkPath(p)
  checkType(value, 'string')

  await writeFile(p, value, options)
}

/**
 * Returns the contents of the document.
 *
 * @param  {string} p
 * @param  {boolean} prettyPrint
 * @param  {any} options
 * @return {Promise<string | Buffer>}
 *
 * @public
 */
async function getValue(p, prettyPrint = false, options = 'utf8') {
  const contents = await readFile(p, options)
  if (!prettyPrint) return contents
  return JSON.stringify(JSON.parse(contents), null, 2)
}

/**
 * Edits the document.
 *
 * @param  {string} p
 * @param  {(oldValue: string) => Promise<string> | string} callback
 * @param  {any} options
 * @return {Promise<void>}
 *
 * @public
 */
async function edit(p, callback, options = 'utf8') {
  checkPath(p)
  checkType(callback, 'function')

  const oldValue = await getValue(p, false, options)
  const newContents = await callback(oldValue)
  await setValue(p, newContents, options)
}

module.exports = {
  setValue,
  getValue,
  edit
}
