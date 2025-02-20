import { getAuthors } from "./get_authors.js";

const authorsList = document.querySelector("#authors-list");

const renderAuthorsAsList = (authors) => {
  authorsList.innerHTML = ""; // Clear list
  authors.forEach((author) => {
    const listItem = document.createElement("li");

    // Create a link for each author's name
    const authorLink = document.createElement("a");
    authorLink.href = `/authors.html?id=${author.author_id}`;  // Link to an author details page
    authorLink.textContent = author.author_name;

    // Append the link to the list item
    listItem.appendChild(authorLink);
    authorsList.appendChild(listItem);
  });
};

const authorsPaginationSelectors = {
  pageNumber: "#pageNumberAuthor",
  prevPage: "#prevPageAuthor",
  nextPage: "#nextPageAuthor"
};

// Fetch and sort the authors list, then render them
getAuthors(renderAuthorsAsList, authorsPaginationSelectors, 100);
