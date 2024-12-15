import { toast } from "./toast.js";
import ApiHandler from "./ApiHandler.js";

const api = new ApiHandler("https://py-library-api-v2.server.steffen.codes");

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = loginForm.querySelector("button[type=submit]");
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  submitButton.disabled = true;
  const loginResult = await api.loginUser(data.email.trim(), data.password);
  if (loginResult.success) {
    localStorage.setItem("userId", loginResult.data.user_id);
    localStorage.setItem("email", data.email.trim());
    toast("Login successful, navigating you to the frontpage ..", "success");
    setTimeout(() => {
      window.location.href = "/homepage.html";
      updateAuthButton(); // Update the button after login
    }, 2000);
  } else {
    submitButton.disabled = false;
    switch (loginResult.statusCode) {
      case 400:
        toast("Missing e-mail or password", "error");
        break;
      case 401:
        toast("Invalid e-mail or password", "error");
        break;
      default:
        toast("An error occurred", "error");
    }
  }
});
