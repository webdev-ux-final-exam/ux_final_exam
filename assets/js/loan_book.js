import ApiHandler from './ApiHandler.js';
import { toast } from "./toast.js";

const api = new ApiHandler();
const userId = sessionStorage.getItem('userId');
const url = new URL(window.location.href);
const bookId = url.searchParams.get("id");

document.getElementById("loan-btn").addEventListener("click", () => {
  if (!userId || !bookId) {
    console.error("Missing userId or bookId.");
    return;
  }

  api.getAdminBook(bookId)
    .then(response => {
      if (response.success) {
        const loans = response.data.loans || [];
        const alreadyLoaned = loans.some(loan => loan.user_id == userId);

        if (alreadyLoaned) {
          toast("You already have this book on loan", "error");
        } else {
          api.loanBook(userId, bookId)
            .then(loanResponse => {
              if (loanResponse.success) {
                console.log("Book loaned successfully:", loanResponse.data);
                toast("Book loaned. An e-book link has been sent to your e-mail.", "success");
              } else {
                console.error("Failed to loan book, status code:", loanResponse.statusCode);
                toast("Failed to loan book", "error");
              }
            })
            .catch(error => {
              console.error("Error loaning book:", error);
              toast("Failed to loan book", "error"); 
            });
        }
      } else {
        console.error("Failed to retrieve book data, status code:", response.statusCode);
        toast("Failed to retrieve book data", "error");
      }
    })
    .catch(error => {
      console.error("Error retrieving book data:", error);
      toast("Failed to retrieve book data", "error");
    });
});
