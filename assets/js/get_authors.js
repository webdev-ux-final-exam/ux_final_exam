import { initializePagination } from "./pagination.js";
import ApiHandler from "./ApiHandler.js";

const api = new ApiHandler();

async function getAuthors(
  renderFunction,
  paginationSelectors = null,
  itemsPerPage = 19
) {
  try {
    const authors = await api.getAuthorsRich(); // Fetch authors from API

    if (authors.success) {
      const authorsData = authors.data;

      // If pagination is needed, apply it
      if (paginationSelectors) {
        initializePagination(
          authorsData,
          itemsPerPage,
          renderFunction,
          paginationSelectors
        );
      } else {
        renderFunction(authorsData);
      }

      return authorsData;
    } else {
      console.error(
        `Failed to fetch authors. Status code: ${authors.statusCode}`
      );
    }
  } catch (error) {
    console.error("An error occurred while fetching authors:", error);
  }
}

export { getAuthors };
