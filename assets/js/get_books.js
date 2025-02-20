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

async function fetchRandomBooks(amount = 24) {
  bookList.innerHTML = "";

  try {
    const response = await api.getBooksByNumber(amount);
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

fetchRandomBooks();

document
  .querySelector("#searchBooks")
  .addEventListener("change", async (event) => {
    const searchValue = event.target.value;
    if (searchValue.length < 3 && searchValue.length !== 0) {
      return;
    }

    bookList.innerHTML = "";

    try {
      const response =
        searchValue.length === 0
          ? await api.getBooksByNumber(24)
          : await api.searchBooksByTitle(searchValue);

      if (!response.success) {
        console.error("Error fetching books:", response);
        return;
      }

      const books = response.data;
      if (books.length === 0) {
        toast("No books found", "error");
        return;
      }

      books.forEach((book) => {
        addBook(
          book.book_id,
          book.title,
          book.author,
          book.publishing_year,
          book.publishing_company);
      });
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  });
