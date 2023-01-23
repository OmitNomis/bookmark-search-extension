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

    // open first result when enter is pressed if search input is focused
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        searchResults.firstChild.click();
      }
    });

    //remove focus from search input and focus first result when down arrow is pressed
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        // remove focus from search input
        searchInput.blur();
        // focus on first result
        searchResults.firstChild.focus();
        // add selected class to first result
        searchResults.firstChild.classList.add("selected");
      }
    });
    // Loop through the bookmarks and add them to the search results
    bookmarks.forEach((bookmark) => {
      const bookmarkLink = document.createElement("a");

      // change focus to next result when down arrow is pressed
      bookmarkLink.addEventListener("keydown", (e) => {
        // if on last result, focus on search input
        if (
          e.key === "ArrowDown" &&
          bookmarks.indexOf(bookmark) === bookmarks.length - 1
        ) {
          // remove selected class from current result
          bookmarkLink.classList.remove("selected");
          // focus on search input
          searchInput.focus();
        } else {
          if (e.key === "ArrowDown") {
            // remove selected class from current result
            bookmarkLink.classList.remove("selected");
            // add selected class to next result
            bookmarkLink.nextSibling.classList.add("selected");
            // focus on next result
            bookmarkLink.nextSibling.focus();
          }
        }
      });
      // change focus to previous result when up arrow is pressed and back to search input when on first result
      bookmarkLink.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && bookmarks.indexOf(bookmark) === 0) {
          // remove selected class from current result
          bookmarkLink.classList.remove("selected");
          // focus on search input
          searchInput.focus();
        } else {
          if (e.key === "ArrowUp") {
            // remove selected class from current result
            bookmarkLink.classList.remove("selected");
            // add selected class to previous
            bookmarkLink.previousSibling.classList.add("selected");
            // focus on previous result
            bookmarkLink.previousSibling.focus();
          }
        }
      });

      bookmarkLink.classList.add("search-result");
      // redirect to the bookmark url when clicked in new tab
      bookmarkLink.target = "_blank";
      // remove focus outline
      bookmarkLink.style.outline = "none";
      bookmarkLink.href = bookmark.url;
      bookmarkLink.textContent = bookmark.title;
      searchResults.appendChild(bookmarkLink);
    });
  });
}
