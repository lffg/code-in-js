const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const origin = path.join(__dirname, 'media');
const dest = path.join(__dirname, 'new-media');

fs.readdirSync('./media')
  .filter((fileName) => !/^\./.test(fileName))
  .forEach((file) => {
    const instance = spawn('ffmpeg', [
      '-i',
      path.join(origin, file),
      path.join(dest, `${file.replace(/\.\w+$/, '')}.mp3`)
    ]);

    instance.on('close', (code) => console.log(file, code));
  });
