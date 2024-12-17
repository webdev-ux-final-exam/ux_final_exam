import ApiHandler from "./ApiHandler.js";
import { toast } from "./toast.js";

const api = new ApiHandler("https://py-library-api-v2.server.steffen.codes");

document.getElementById("add-author-frm").addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const formData = new FormData(e.target);
  const authorData = Object.fromEntries(formData.entries());

  if (!authorData.first_name) {
    toast("Please fill in all required fields.", "error");
    return; 
  }

  try {
    const createAuthor = await api.createAuthor(authorData);

    if (createAuthor.success) {
      toast("Author created", "success"); 
      e.target.reset(); 
    } else {
      toast("Failed to add author.", "error"); 
      console.log(`Status code: ${createAuthor.statusCode}`);
    }

  } catch (error) {
    console.error("An error occurred while adding the author:", error);
  }
});
