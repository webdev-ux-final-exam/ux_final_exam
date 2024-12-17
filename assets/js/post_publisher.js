import ApiHandler from "./ApiHandler.js";
import { toast } from "./toast.js";

const api = new ApiHandler("https://py-library-api-v2.server.steffen.codes");

document.getElementById("add-publisher-frm").addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const formData = new FormData(e.target);
  const publisherData = Object.fromEntries(formData.entries());

  if (!publisherData.name) {
    toast("Please fill in all required fields.", "error");
    return; 
  }

  try {
    const createPublisher = await api.createPublisher(publisherData);

    if (createPublisher.success) {
      toast("Publisher created", "success"); 
      e.target.reset(); 
    } else {
      toast("Failed to add publisher.", "error"); 
      console.log(`Status code: ${createPublisher.statusCode}`);
    }

  } catch (error) {
    console.error("An error occurred while adding the publisher:", error);
  }
});