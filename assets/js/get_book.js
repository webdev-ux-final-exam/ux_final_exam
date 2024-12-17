import ApiHandler from "./ApiHandler.js";
import { toast } from "./toast.js";

const api = new ApiHandler();

async function getAuthorByName(authorName) {
  try {
    const response = await api.getAuthors();
    if (!response.success) {
      console.error("Error fetching authors:", response);
      return;
    }

    const authors = response.data;
    const author = authors.find((author) => author.author_name === authorName);

    return author;
  } catch (err) {
    // global error handler in ApiHandler.js would be better, probably, like a toast
    console.error("Error fetching authors:", err);
  }
}

async function loadBookId(bookId) {
  try {
    const response = await api.getBookDetails(bookId);
    if (!response.success) {
      console.error("Error fetching books:", response);
      return;
    }

    const book = response.data;
    const bookContainer = document.querySelector(".book-details");

    bookContainer.querySelector(".cover").src =
      book.cover || "https://placehold.co/265x475?text=No+Cover";
    bookContainer.querySelector(".title").textContent = book.title;
    bookContainer.querySelector(".author").textContent = book.author;
    bookContainer.querySelector(".year").textContent = book.publishing_year;
    bookContainer.querySelector(".publisher").textContent =
      book.publishing_company;

    const author = await getAuthorByName(book.author);
    bookContainer.querySelector(
      ".author-link"
    ).href = `/authors.html?id=${author.author_id}`;
  } catch (err) {
    // global error handler in ApiHandler.js would be better, probably, like a toast
    console.error("Error fetching books:", err);
  }
}

const currentUrl = window.location.href;
const url = new URL(currentUrl);
const bookId = url.searchParams.get("id");
if (
  !bookId ||
  isNaN(bookId) ||
  Number(bookId) < 1 ||
  !Number.isInteger(Number(bookId))
) {
  window.location.href = "/homepage.html";
}

loadBookId(bookId);
