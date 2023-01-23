// Get the search input and results elements
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

// Add an event listener to the search input to handle searches
searchInput.addEventListener("input", searchBookmarks);

//automatically focus on search input
searchInput.focus();

// Search function
function searchBookmarks() {
  // Get the search term
  const searchTerm = searchInput.value;

  // Use the chrome.bookmarks API to search through the bookmarks
  chrome.bookmarks.search(searchTerm, (bookmarks) => {
    // Clear the search results

    // don't match folder names
    bookmarks = bookmarks.filter((bookmark) => bookmark.url);

    // hide search results if no search term
    if (searchTerm === "") {
      searchResults.style.display = "none";
      return;
    } else {
      searchResults.style.display = "flex";
    }

    searchResults.innerHTML = "";

    // Show a message if no bookmarks are found
    if (bookmarks.length === 0) {
      const noResults = document.createElement("p");
      noResults.classList.add("no-results");
      noResults.textContent = "No bookmarks found";
      searchResults.appendChild(noResults);
      return;
    }

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
