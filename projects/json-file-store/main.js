const path = require('path')

const { setValue, getValue, edit } = require('./interact')

const DB_PATH = path.join(__dirname, 'db')
const DOCUMENT_PATH = path.join(DB_PATH, 'store.json')

/** @param {string} p */
async function main(p) {
  // Sets the initial value:
  await setValue(p, JSON.stringify([]))

  await edit(p, (oldValue) => {
    const arr = JSON.parse(oldValue)
    arr.push({ name: 'Luiz' })
    arr.push({ name: 'Goufix' })
    arr.push({ name: 'Bruno' })
    return JSON.stringify(arr)
  })

  console.log(await getValue(p, true))

  await edit(p, (oldValue) => {
    const arr = JSON.parse(oldValue)
    const index = arr.findIndex(({ name }) => name === 'Goufix')
    arr.splice(index, 1)
    return JSON.stringify(arr)
  })

  console.log(await getValue(p, true))
}

main(DOCUMENT_PATH).catch((error) => console.error('-- Error: -- \n\n', error))
