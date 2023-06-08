// https://results.eci.gov.in/ResultAcGenMay2023/ConstituencywiseS1034.htm?ac=34

import got from "got";
import cheerio from "cheerio";
import constituencies from "./constituencies.json" assert { type: "json" };
import Datastore from "nedb";

const { ALGOLIA_ADMIN_API_KEY } = process.env;

const resultsDB = new Datastore({
  filename: "./results.db",
  autoload: true,
});

const pause = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getResults = async () => {
  const results = [];
  while (constituencies.length) {
    const constituency = constituencies.pop();
    const { name, number } = constituency;
    const url = `https://results.eci.gov.in/ResultAcGenMay2023/ConstituencywiseS10${number}.htm?ac=${number}`;
    console.log("url", url);
    const response = await got(url);
    if (response.statusCode !== 200) {
      console.log(
        "response.statusCode",
        response.statusCode
      );
      // constituencies.push(constituency);
      continue;
    }
    await pause(1000);
    const $ = cheerio.load(response.body);
    const tables = $("table");
    const table = tables[9];
    const rows = $(table).find("tr");
    let constituencyName = null;
    rows.each((index, row) => {
      if (index === 0) {
        const cells = $(row).find("td");
        constituencyName = $(cells[0]).text().trim();
      }
      if (index === 0 || index === 1 || index === 2) return;
      const cells = $(row).find("td");
      const candidateName = $(cells[1]).text();
      const partyName = $(cells[2]).text();
      const votes = $(cells[3]).text();
      const percentVotes = $(cells[4]).text();
      let candidate = {
        name,
        number,
        candidateName,
        partyName,
        votes,
        percentVotes,
        constituencyName,
      };
      console.log("Inserted candidate", candidate.name)
      results.push(candidate);
      resultsDB.insert(candidate);
    });
  }
  // console.log(results);
  return results;
};

getResults();
