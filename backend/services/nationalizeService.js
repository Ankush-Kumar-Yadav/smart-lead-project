const axios = require("axios");

// --- SIMPLE CUSTOM CONCURRENCY LIMITER ---
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = [];
  const executing = [];

  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);

    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }

  return Promise.all(ret);
}
// -----------------------------------------

async function fetchForName(name) {
  try {
    const resp = await axios.get("https://api.nationalize.io", {
      params: { name },
      timeout: 10000
    });

    const data = resp.data;

    if (!data || !data.country || data.country.length === 0) {
      return { name, country: null, probability: 0, status: "To Check" };
    }

    const top = data.country.reduce((a, b) =>
      a.probability >= b.probability ? a : b
    );

    const country = top.country_id;
    const probability = top.probability || 0;
    const status = probability >= 0.6 ? "Verified" : "To Check";

    return { name, country, probability, status };

  } catch (err) {
    console.warn("Error fetching", name, err && err.message ? err.message : err);
    return { name, country: null, probability: 0, status: "To Check" };
  }
}

exports.enrichNames = async function (names) {
  return asyncPool(5, names, fetchForName); // 5 parallel requests
};
