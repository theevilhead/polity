import winners from "./winners-raw.json" assert { type: "json" };
import Datastore from "nedb";

const { ALGOLIA_ADMIN_API_KEY } = process.env;

const winnersDB = new Datastore({
  filename: "./winners.db",
  autoload: true,
});

const records = winners.records;

while(records.length) {
  const record = records.pop();
  const constituencyName = record[2].trim();
  const politicianName = record[3].trim();
  const partyName = record[4].trim();

  winnersDB.insert({
    constituencyName,
    politicianName,
    partyName
  })
  console.log("Inserted winner", constituencyName);
}