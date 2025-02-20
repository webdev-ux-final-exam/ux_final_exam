import { getAuthors } from "./get_authors.js";
import ApiHandler from "./ApiHandler.js";

const api = new ApiHandler();
const template = document.getElementById("author-template");
const authorsList = document.querySelector("#authors-list");
const filterByPublisherSelect = document.getElementById("filter-by-publisher");

const renderAuthorsAsList = (authors) => {
  authorsList.innerHTML = ""; // Clear list
  authors.forEach((author) => {
    const clone = template.content.cloneNode(true);
    const articleElement = clone.querySelector("article");

    articleElement.setAttribute("data-author-id", author.author_id);

    articleElement.querySelector(".author-name").textContent =
      author.author_name;
    articleElement.querySelector(".book-count").textContent =
      author.books.length;
    articleElement.querySelector(
      ".author-details"
    ).href = `/authors.html?id=${author.author_id}`;

    authorsList.appendChild(clone);
  });
};

const authorsPaginationSelectors = {
  pageNumber: "#pageNumberAuthor",
  prevPage: "#prevPageAuthor",
  nextPage: "#nextPageAuthor",
};

// Fetch and sort the authors list, then render them
getAuthors(renderAuthorsAsList, authorsPaginationSelectors, 100).then(
  async () => {
    const books = await api.getAllBooks();

    const publishers = books.data.map((book) => book.publishing_company);
    const uniquePublishers = [...new Set(publishers)]; // create a new Set to remove duplicates, then spread it back into an array
    uniquePublishers.forEach((publisher) => {
      const option = document.createElement("option");
      option.value = publisher;
      option.textContent = publisher;
      filterByPublisherSelect.appendChild(option);
    });
  }
);
