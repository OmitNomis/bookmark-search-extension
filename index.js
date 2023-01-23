import React from "react";
import ReactDOM from "react-dom";

function BookmarkSearch() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [bookmarks, setBookmarks] = React.useState([]);
  const [matches, setMatches] = React.useState([]);

  React.useEffect(() => {
    chrome.bookmarks.search(searchTerm, (results) => {
      setMatches(results);
    });
  }, [searchTerm]);

  React.useEffect(() => {
    chrome.bookmarks.getTree((results) => {
      setBookmarks(results[0].children);
    });
  }, []);

  return (
    <div className="relative">
      <input
        className="w-full rounded-md py-2 px-3 text-gray-700 leading-5 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
        type="text"
        placeholder="Search bookmarks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute top-0 left-0 w-full py-2 bg-white rounded-md shadow-md">
        {matches.map((match) => (
          <a
            key={match.id}
            href={match.url}
            className="block px-3 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          >
            {match.title}
          </a>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<BookmarkSearch />, document.getElementById("root"));
