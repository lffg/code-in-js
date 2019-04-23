const seconds = [
  ...document.querySelectorAll('#contents > ytd-playlist-video-renderer')
]
  .map((el) => el.querySelector('ytd-thumbnail-overlay-time-status-renderer'))
  .filter((el) => !!el)
  .map(({ textContent }) => textContent)
  .map((duration) => duration.trim())
  .map((time) => time.split(':').map((t) => parseInt(t)))
  .map((time) => time.map((t) => parseInt(t)))
  .map(([min, sec]) => min * 60 + sec)
  .reduce((a, c) => a + c, 0)

const restS = seconds % 60
const minutes = (seconds - restS) / 60

const restM = minutes % 60
const hours = (minutes - restM) / 60

console.log('Total time:')
console.log(`${hours} hour(s), ${restM} minute(s) e ${restS} second(s).`)

// Assert:
console.assert(seconds === hours * 60 * 60 + restM * 60 + restS)
