const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function cb(n) {
  await wait(Math.random() * 1000);

  if (n === 4) {
    throw new Error(`I don't like 4.`);
  }

  return n;
}

const promises = [1, 2, 3, 4, 5].map(cb);

(async () => {
  try {
    const res = await Promise.all(promises);
    console.log(res);
  } catch (error) {
    console.error(error.message);
  }
})();
