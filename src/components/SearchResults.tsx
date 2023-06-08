type Candidate = {
  politicianName: string;
  constituencyName: string;
  partyName: string;
};

export default function SearchResults({
  candidates,
  searchTerm = "",
}: {
  candidates: Candidate[];
  searchTerm: string;
  }) {
  return (
    <>
      {candidates.map((client) => {
        const politicianName = client.politicianName;
        const constituencyName = client.constituencyName;
        const partyName = client.partyName;

        const highlightPoliticianName = searchTerm.length
          ? politicianName.replace(
              new RegExp(searchTerm, "gi"),
              (match) =>
                `<mark class="bg-yellow-500">${match}</mark>`
            )
          : politicianName;

        const highlightConstituencyName = searchTerm.length
          ? constituencyName.replace(
              new RegExp(searchTerm, "gi"),
              (match) =>
                `<mark class="bg-yellow-500">${match}</mark>`
            )
          : constituencyName;

        const highlightPartyName = searchTerm.length
          ? partyName.replace(
              new RegExp(searchTerm, "gi"),
              (match) =>
                `<mark class="bg-yellow-500">${match}</mark>`
            )
          : partyName;

        return (
          <tr key={constituencyName}>
            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
              <div className="flex items-center">
                {/* <div className="h-11 w-11 flex-shrink-0">
                  <img
                    className="h-11 w-11 rounded-full"
                    src={politicianName}
                    alt=""
                  />
                </div> */}
                {/* <div className="ml-4"> */}
                <div>
                  <div
                    className="font-medium text-gray-900"
                    dangerouslySetInnerHTML={{
                      __html: highlightPoliticianName,
                    }}
                  />
                  {/* <div className="mt-1 text-gray-500">
                    {constituencyName}
                  </div> */}
                </div>
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
              <div
                className="text-gray-900"
                dangerouslySetInnerHTML={{
                  __html: highlightPartyName,
                }}
              />
              {/* <div className="mt-1 text-gray-500">
                {partyName}
              </div> */}
            </td>
            {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Active
              </span>
            </td> */}
            <td
              className="whitespace-nowrap px-3 py-5 text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: highlightConstituencyName,
              }}
            />
            {/* <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
              <a
                href="#"
                className="text-indigo-600 hover:text-indigo-900"
              >
                Edit
                <span className="sr-only">
                  , {politicianName}
                </span>
              </a>
            </td> */}
          </tr>
        );
      })}
    </>
  );
}
