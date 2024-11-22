import ApiHandler from "./ApiHandler.js";

const api = new ApiHandler("https://py-library-api-v2.server.steffen.codes");

async function fetchRandomBooks(amount = 10) {
  const template = document.getElementById("book-template");
  const bookList = document.getElementById("random-book-list");

  bookList.innerHTML = "";

  try {
    const books = await api.getBooksByNumber(amount);
    console.log("Fetched Books:", books);

    books.forEach((book) => {
      const clone = template.content.cloneNode(true);

      clone.querySelector("h3").textContent = book.title;
      clone.querySelector(
        ".book-author"
      ).textContent = `Author: ${book.author}`;
      clone.querySelector(
        ".book-publishing"
      ).textContent = `Published in ${book.publishing_year} by ${book.publishing_company}`;
      clone.querySelector(".book-link").href = `/loan/${book.id}`;

      bookList.appendChild(clone);
    });
  } catch (err) {
    // global error handler in ApiHandler.js would be better, probably, like a toast
    console.error("Error fetching books:", err);
  }
}

fetchRandomBooks();
