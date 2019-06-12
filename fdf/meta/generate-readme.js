const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

const TARGET_DIR = path.join(__dirname, '..');
const README = path.join(TARGET_DIR, 'README.md');
const GH_LINK = 'https://github.com/lffg/code-in-js/blob/master/fdf';

/**
 * Get the label for a single script.
 *
 * @param {string} file
 * @return {Promise<string|boolean>}
 */
async function getScriptLabel(file) {
  const fileContents = await readFile(file, 'utf8');
  const matches = fileContents.match(/(\/\*\*[\s\S]*?\*\/)/gi);

  if (!matches || !matches[0]) {
    return false;
  }

  return matches[0]
    .split('\n')
    .map((line) => line.replace(/^ ?(\/\*{2}|\*\/?)/gi, '').trim())
    .filter((line) => /\S/.test(line) && !/^@\w+/.test(line))
    .map((line, index, list) => `${line}  `)
    .join('\n')
    .trim();
}

/**
 * Get the label of every script on the given file list.
 *
 * @param {{ fileName: string, filePath: string }[]} files
 * @return {{ fileName: string, filePath: string, label: string }[]}
 */
async function getAllLabels(files) {
  // Clojure Lang? LOL!
  return (await Promise.all(
    files.map(async (file) => ({
      ...file,
      label: await getScriptLabel(file.filePath)
    }))
  )).filter(({ label }) => !!label);
}

/**
 * Returns a list of all the scripts of the target dir.
 *
 * @return {Promise<{ fileName: string, filePath: string }[]>}
 */
async function getScripts() {
  const contents = await readdir(TARGET_DIR);

  const scripts = contents
    .filter((file) => path.extname(file) === '.js')
    .map((file) => ({ fileName: file, filePath: path.join(TARGET_DIR, file) }));

  return scripts;
}

/**
 *
 * @param {{ fileName: string, filePath: string, label: string }[]} labels
 * @param {string} readmePath
 * @return {string}
 */
function generateContents(labels) {
  return [
    '<!-- THIS IS A GENERATED FILE. DO NOT EDIT IT DIRECTLY. -->',
    '',
    '# Scripts Index',
    '',
    '<table>',
    '<thead><tr><th>File</th><th>Description</th></tr></thead>',
    ...labels.map(({ fileName, label }) =>
      [
        '<tr>',
        `<td><a href="${GH_LINK}/${fileName}"><code>${fileName}</code></a></td>`,
        `<td>${label.replace(/ {2}/g, '<br />')}</td>`,
        '</tr>'
      ].join('')
    ),
    '</table>'
  ].join('\n');
}

/**
 * Generates (or updates) the README.md index file.
 *
 * @param {string} contents
 * @return {Promise<boolean>}
 */
async function generateFile(contents) {
  await writeFile(README, contents);
  return true;
}

/**
 * Initial function. Initialize all the tasks.
 *
 * @return {Promise<void>}
 */
async function main() {
  const scripts = await getScripts();
  const labels = await getAllLabels(scripts);

  await generateFile(generateContents(labels));
}

main()
  .then(() => console.log('Done. Do not forget to commit the new README.'))
  .catch((error) => console.error(error));
