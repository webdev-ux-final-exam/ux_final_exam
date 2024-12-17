import ApiHandler from "./ApiHandler.js";
import { toast } from "./toast.js";

// makes sure publishing_year is no later that the current year
window.onload = function() {
  const currentYear = new Date().getFullYear(); 
  const yearInput = document.getElementById("publishing_year");
  yearInput.max = currentYear; 
};

const api = new ApiHandler("https://py-library-api-v2.server.steffen.codes");

document.getElementById("add-book-frm").addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const formData = new FormData(e.target);
  const bookData = Object.fromEntries(formData.entries());

  if (!bookData.title || !bookData.author_id || !bookData.publisher_id || !bookData.publishing_year) {
    toast("Please fill in all required fields.", "error");
    return; 
  }

  try {
    const createBook = await api.createBook(bookData);

    if (createBook.success) {
      toast("Book added", "success"); 
      e.target.reset(); 
    } else {
      toast("Failed to add book.", "error"); 
      console.log(`Status code: ${createBook.statusCode}`);
    }

  } catch (error) {
    console.error("An error occurred while adding the book:", error);
  }
});
