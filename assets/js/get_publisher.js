import { initializePagination } from './pagination.js';
import ApiHandler from "./ApiHandler.js";

const api = new ApiHandler("https://py-library-api-v2.server.steffen.codes");

async function getPublishers() {
  const publishersTableBody = document.querySelector("#publishersTable tbody"); // Get the table body
  try {
    const publishers = await api.getPublishers(); // Fetch publishers from API
    if (publishers.success) {
      const publishersData = publishers.data;  // Get the 'data' array from the API response

      // Clear existing table rows
      publishersTableBody.innerHTML = "";

      // Define a render function that adds rows to the table
      const renderPublishers = (publishersPage) => {
        publishersTableBody.innerHTML = "";
        publishersPage.forEach((publisher) => {
          const publisherRow = document.createElement("tr");
          const publisherIdCell = document.createElement("td");
          const publisherNameCell = document.createElement("td");

          publisherIdCell.textContent = publisher.publisher_id;
          publisherNameCell.textContent = publisher.publisher_name;

          publisherRow.appendChild(publisherIdCell);
          publisherRow.appendChild(publisherNameCell);

          publishersTableBody.appendChild(publisherRow);
        });
      };

      const publishersPaginationSelectors = {
        pageNumber: "#pageNumberPublisher",
        prevPage: "#prevPagePublisher",
        nextPage: "#nextPagePublisher"
      };

      // Initialize pagination and pass the rendering callback
      initializePagination(publishersData, 19, renderPublishers, publishersPaginationSelectors); // 10 items per page
    } else {
      console.error(`Failed to fetch publishers. Status code: ${publishers.statusCode}`);
    }
  } catch (error) {
    console.error("An error occurred while fetching publishers:", error);
  }
}
getPublishers();