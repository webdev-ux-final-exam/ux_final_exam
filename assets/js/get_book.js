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
    const userEmail = sessionStorage.getItem("email");
    const isAdmin = userEmail === "admin.library@mail.com";

    const response = isAdmin
      ? await api.getAdminBook(bookId)
      : await api.getBookDetails(bookId);

    if (!response.success) {
      console.error("Error fetching book:", response);
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

    const breadcrumbs = document.querySelector(".breadcrumbs");
    if (breadcrumbs) {
      const lastItem = breadcrumbs.lastElementChild;
      const spinner = lastItem.querySelector(".loader");
      if (spinner) {
        spinner.parentElement.innerHTML = book.title;
      }
    }

    const author = await getAuthorByName(book.author);
    bookContainer.querySelector(
      ".author-link"
    ).href = `authors.html?id=${author.author_id}`;

    const isLoggedIn = sessionStorage.getItem("userId") !== null;

    if (!isLoggedIn) {
      const loanMessage = document.createElement("p");
      loanMessage.textContent = "You can loan this book for 30 days with an account.";
      document.querySelector(".book-details .flex-col").appendChild(loanMessage);
    }

    if (isLoggedIn && !isAdmin) {
      const loanBtn = document.getElementById("loan-btn");
      if (loanBtn) {
        loanBtn.classList.remove("hidden")
      }
    }

    if (isAdmin && book.loans && book.loans.length > 0) {
      const loanContainer = document.querySelector(".loan-container");
      loanContainer.classList.remove("hidden")

      loanContainer.querySelector(".loan-title").textContent = "Loan History:";

      const loanList = document.createElement("ul");
      book.loans.forEach((loan) => {
        const loanItem = document.createElement("li");
        loanItem.textContent = `User ID: ${loan.user_id}, Loan Date: ${loan.loan_date}`;
        loanList.appendChild(loanItem);
      });
      loanContainer.appendChild(loanList);
    }
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
  window.location.href = "homepage.html";
}

loadBookId(bookId);
