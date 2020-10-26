/**
 * List all custom HTML pages of a Forumactif Forum.
 * This script may not work. It is currently unstable.
 *
 * @author Luiz Felipe Gonçalves <https://luizfelipe.dev>
 * @license MIT
 */

/* eslint no-sequences: 0 */
/* eslint no-unused-vars: 2 */
/* eslint strict: [2, "safe"] */
/* eslint no-restricted-globals: 0 */

"use strict";

const pageUrl = `${location.protocol}//${location.host}`.replace(/\/*$/, "");

async function getHTML(uri) {
  const response = await fetch(uri, { redirect: "manual" });
  return response.text();
}

function getTitle(pageContents, uri) {
  if (!pageContents) {
    return `${uri}: ERROR!`;
  }

  const parser = new DOMParser();
  const document = parser.parseFromString(pageContents, "text/html");

  const title = (document.querySelector("title") || {}).textContent;
  return `${uri}: ${title || "No title."}`;
}

async function fetchPages(from = 0, add = 1) {
  const count = from + add;
  console.warn(`Loading pages ${from} ~ ${count} ...`);

  const promises = Array.from({ length: count })
    .map((_, index) => `${pageUrl}/h${index + 1}-`)
    .map(async (link) => [await getHTML(link), link]);

  const done = await Promise.allSettled(promises);

  return done.map(({ status, value: [html, uri] }) =>
    getTitle(status === "fulfilled" ? html : null, uri)
  );
}

fetchPages(1, 50).then(
  (array) => (console.log("Done:"), console.log(array.join("\n")))
);
