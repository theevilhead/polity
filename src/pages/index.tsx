import React, { useState } from "react";
import SearchResults from "@/components/SearchResults";
import Datastore from "nedb";
import FuzzySearch from "fuzzy-search";
import path from "path";

export default function Index(props: {
  candidates: any[];
}) {

  const [searchTerm, setSearchTerm] = useState("");
  const searcher = new FuzzySearch(props.candidates, [
    "politicianName",
    "constituencyName",
    "partyName",
  ]);

  const results = searcher.search(searchTerm);

  return (
    <div>
      <div className="h-96 flex flex-col justify-center items-center flex-wrap">
        <div className="relative max-w-lg mx-auto w-full">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Constituency Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Ex: Hubli Dharwad Central"
          />
        </div>
        <h1 className="mt-4">
          Total constituencies - {props.candidates.length}
        </h1>
        <h1 className="mt-4">
          Search results - {results.length}
        </h1>
      </div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Party
            </th>
            {/* <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Status
            </th> */}
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Constituency
            </th>
            {/* <th
              scope="col"
              className="relative py-3.5 pl-3 pr-4 sm:pr-0"
            >
              <span className="sr-only">Edit</span>
            </th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <SearchResults
            candidates={
              searchTerm.length
                ? results
                : props?.candidates
            }
            searchTerm={searchTerm}
          />
        </tbody>
      </table>
    </div>
  );
}

// GetSeverSideProps
export async function getServerSideProps() {
  const resultsDB = new Datastore({
    filename: 'public/winners.db',
    autoload: true,
  });

  const getResults = () => {
    return new Promise((resolve, reject) => {
      resultsDB.find({}, (err: any, docs: any[]) => {
        if (err) {
          reject(err);
        }
        resolve(docs);
      });
    });
  };
  const results = await getResults();

  return {
    props: {
      candidates: JSON.parse(JSON.stringify(results)),
    },
  };
}
