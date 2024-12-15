import ApiHandler from "./ApiHandler.js";

const api = new ApiHandler("https://py-library-api-v2.server.steffen.codes");
async function getAuthors() {
  const authorsTableBody = document.querySelector("#authorsTable tbody"); // Get the table body
  try {
    const authors = await api.getAuthors(); // Fetch authors from API

    if (authors.success) {
      authors.data.forEach(author => {
        // Create a new table row for each author
        const authorRow = document.createElement("tr");

        // Create table cells for author ID and name
        const authorIdCell = document.createElement("td");
        authorIdCell.textContent = author.author_id;

        const authorNameCell = document.createElement("td");
        authorNameCell.textContent = author.author_name;

        // Append the cells to the row
        authorRow.appendChild(authorIdCell);
        authorRow.appendChild(authorNameCell);

        // Append the row to the table body
        authorsTableBody.appendChild(authorRow);
      });
    } else {
      console.error(`Failed to fetch authors. Status code: ${authors.statusCode}`);
    }
  } catch (error) {
    console.error("An error occurred while fetching authors:", error);
  }
}

getAuthors();
