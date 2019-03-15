const querystring = require('querystring')

function generateUrl(baseUrl, params) {
  return `${baseUrl}?${querystring.stringify(params)}`
}

console.log(
  generateUrl('https://luizfelipe.dev/search', {
    q: 'querystring-module',
    author: 'lffg',
    location: 'github',
    repository: 'code-in-js'
  })
)
