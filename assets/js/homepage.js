import ApiHandler from "./ApiHandler.js";

const api = new ApiHandler();

const isLoggedIn = sessionStorage.getItem("userId") !== null;

const usernameDisplay = document.getElementById("username-display");

if (isLoggedIn) {
  const userId = sessionStorage.getItem("userId");

  api.getUser(userId)
    .then((response) => {
      if (response.success) {
        const firstName = response.data.first_name;

        // Display the first name
        usernameDisplay.textContent = `${firstName}`;
        usernameDisplay.classList.remove("hidden")

      } else {
        console.error("Failed to fetch user details:", response.statusCode);
      }
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });
} else {
  window.location.href = "index.html";
}