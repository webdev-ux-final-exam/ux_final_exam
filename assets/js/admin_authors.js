import { getAuthors } from "./get_authors.js";

const authorsTableBody = document.querySelector("#authorsTable tbody");

const renderAuthorsAsTable = (authorsPage) => {
  authorsTableBody.innerHTML = ""; // Clear table
  authorsPage.forEach((author) => {
    const authorRow = document.createElement("tr");
    const authorIdCell = document.createElement("td");
    const authorNameCell = document.createElement("td");

    authorIdCell.textContent = author.author_id;
    authorNameCell.textContent = author.author_name;

    authorRow.appendChild(authorIdCell);
    authorRow.appendChild(authorNameCell);

    authorsTableBody.appendChild(authorRow);
  });
};

const authorsPaginationSelectors = {
  pageNumber: "#pageNumberAuthor",
  prevPage: "#prevPageAuthor",
  nextPage: "#nextPageAuthor"
};

// Call the function with table rendering
getAuthors(renderAuthorsAsTable, authorsPaginationSelectors);
