import { initializePagination } from './pagination.js';
import ApiHandler from "./ApiHandler.js";

const api = new ApiHandler("https://py-library-api-v2.server.steffen.codes");

async function getAuthors() {
  const authorsTableBody = document.querySelector("#authorsTable tbody"); // Get the table body
  try {
    const authors = await api.getAuthors(); // Fetch authors from API

    if (authors.success) {
      const authorsData = authors.data;  // Get the 'data' array from the API response

      // Clear existing table rows
      authorsTableBody.innerHTML = "";

      // Define a render function that adds rows to the table
      const renderAuthors = (authorsPage) => {
        authorsTableBody.innerHTML = "";
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
      // Initialize pagination and pass the rendering callback
      initializePagination(authorsData, 19, renderAuthors, authorsPaginationSelectors); // 10 items per page
    } else {
      console.error(`Failed to fetch authors. Status code: ${authors.statusCode}`);
    }
  } catch (error) {
    console.error("An error occurred while fetching authors:", error);
  }
}
getAuthors();