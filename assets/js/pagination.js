export function initializePagination(items, itemsPerPage, renderCallback) {
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Handle page navigation
  let currentPage = 0;

  // Show the first page
  renderCallback(items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));

  const pageNumberElement = document.getElementById("pageNumber");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");

  // Update page number
  const updatePageNumber = () => {
    pageNumberElement.textContent = `${currentPage + 1} / ${totalPages}`;
  };

  // Render a specific page
  const renderPage = (direction) => {
    if (direction === "next" && currentPage < totalPages - 1) {
      currentPage++;
    } else if (direction === "prev" && currentPage > 0) {
      currentPage--;
    }
    renderCallback(items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
    updatePageNumber();
  };

  // Event listeners for pagination buttons
  prevPageButton.addEventListener("click", () => renderPage("prev"));
  nextPageButton.addEventListener("click", () => renderPage("next"));

  updatePageNumber();
}
