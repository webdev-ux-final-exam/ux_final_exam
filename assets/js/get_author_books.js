import ApiHandler from "./ApiHandler.js";
import { toast } from "./toast.js";

const api = new ApiHandler();
const template = document.getElementById("book-template");
const bookList = document.getElementById("book-grid");

const addBook = (bookId, title, author, year, company) => {
  const clone = template.content.cloneNode(true);

  clone.querySelector(".book-title").textContent = title;
  clone.querySelector(".book-author").textContent = `by ${author}`;
  clone.querySelector(".book-year").textContent = year || "Unknown year";
  clone.querySelector(".book-company").textContent = company;
  clone.querySelector(".book-details").href = `books.html?id=${bookId}`;

  bookList.appendChild(clone);
};

async function fetchAuthorBooks(authorId) {
  bookList.innerHTML = "";

  try {
    const response = await api.getBooksByAuthor(authorId);
    if (!response.success) {
      console.error("Error fetching books:", response);
      return;
    }

    const books = response.data;
    books.forEach((book) => {
      addBook(
        book.book_id,
        book.title,
        book.author,
        book.publishing_year,
        book.publishing_company
      );
    });
  } catch (err) {
    // global error handler in ApiHandler.js would be better, probably, like a toast
    console.error("Error fetching books:", err);
  }
}

const currentUrl = window.location.href;
const url = new URL(currentUrl);
const authorId = url.searchParams.get("id");
if (
  !authorId ||
  isNaN(authorId) ||
  Number(authorId) < 1 ||
  !Number.isInteger(Number(authorId))
) {
  window.location.href = "homepage.html";
}

async function fetchAuthorDetails(authorId) {
  try {
    const response = await api.getAuthors();
    if (!response.success) {
      console.error("Error fetching author details:", response);
      return;
    }

    const authors = response.data;
    const author = authors.find(
      (author) => author.author_id === Number(authorId)
    );

    if (!author) {
      window.location.href = "homepage.html";
      return;
    }

    document.querySelector(".author-name").textContent = author.author_name;
  } catch (err) {
    // global error handler in ApiHandler.js would be better, probably, like a toast
    console.error("Error fetching author details:", err);
  }
}

fetchAuthorBooks(authorId);
fetchAuthorDetails(authorId);
