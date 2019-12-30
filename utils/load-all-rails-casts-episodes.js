//
// Just for fun!
// Make sure you run that script in some of RailCasts website's pages.
//

const getUrl = (i) => `http://railscasts.com/episodes/${i}`;

(async () => {
  console.log(1);

  const urls = Array.from({ length: 417 })
    .map((_, i) => i + 1)
    .map(getUrl)
    .map(async (url) => {
      const res = await fetch(url);
      const html = await res.text();
      console.log(`Loaded ${url}`);

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      return [doc, url];
    });

  console.log(2);

  const promises = await Promise.allSettled(urls);

  const pages = promises
    .filter((promise) => promise.status === 'fulfilled')
    .map(({ value: [doc, url] }) => [
      (doc.querySelector('title') || {}).textContent || 'Não definido.',
      url
    ])
    .map(([title, url]) => `- [${title}](${url})`)
    .join('\n');

  const diff = promises.length - pages.length;
  if (!diff) {
    console.warn(
      `${promises.length - pages.length} páginas não foram carregadas.`
    );
  }

  // Sorry, page. :/
  [...document.body.children].forEach((node) => node.remove());

  const zone = Object.assign(document.createElement('textarea'), {
    value: pages,
  });

  Object.assign(zone.style, {
    border: 'solid 3px #000',
    backgroundColor: '#222',
    color: '#fff',
    fontFamily: 'SF Mono, Fira Code, monospace',
    fontSize: '18px',
    lineHeight: '1.7'
  });

  document.body.appendChild(zone);
})();
