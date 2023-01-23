// Get the search input and results elements
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

// Add an event listener to the search input to handle searches
searchInput.addEventListener("input", searchBookmarks);

// Search function
function searchBookmarks() {
  // Get the search term
  const searchTerm = searchInput.value;

  // Use the chrome.bookmarks API to search through the bookmarks
  chrome.bookmarks.search(searchTerm, (bookmarks) => {
    // Clear the search results
    searchResults.innerHTML = "";

    // Loop through the bookmarks and add them to the search results
    bookmarks.forEach((bookmark) => {
      const bookmarkLink = document.createElement("a");
      bookmarkLink.classList.add("search-result");
      // redirect to the bookmark url when clicked in new tab
      bookmarkLink.target = "_blank";
      bookmarkLink.href = bookmark.url;
      bookmarkLink.textContent = bookmark.title;
      searchResults.appendChild(bookmarkLink);
    });
  });
}
