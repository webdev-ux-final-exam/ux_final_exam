import ApiHandler from "./ApiHandler.js";
import { toast } from "./toast.js";
import { logout } from './header.js';

const api = new ApiHandler();

document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.getElementById("delete-btn");

  deleteButton.addEventListener("click", async () => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in sessionStorage");
      return;
    }

    try {
      const response = await api.deleteUser(userId);

      if (response.success) {
        toast("Profile deleted", "success");
        
        setTimeout(() => {
          logout();
        }, 2000);
      } else {
        console.error("Error deleting user. Status code:", response.statusCode);
        toast("Profile could not be deleted", "error");
      }
    } catch (error) {
      console.error("Error while attempting to delete the user:", error);
      toast("Profile could not be deleted", "error");
    }
  });
});
