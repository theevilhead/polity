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


const verifyResults = async () => {

  // group by constituencyName
  const results = new Set();
  resultsDB.find({}, async (err, docs) => {
    console.log("Total candidates", docs.length);
    docs.forEach(async (doc) => {
      results.add(doc.constituencyName);
    });
    console.log("Total constituencies", results.size);
  });
  
};

verifyResults();