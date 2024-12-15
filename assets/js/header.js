// logout logic
export const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("email");

  // Redirect to the homepage or login page after logout
  setTimeout(() => {
    window.location.href = "/index.html"; // Redirect after logout
    updateAuthButton(); // Update the button after logout
  }, 2000);
};

const isUserLoggedIn = () => {
  return localStorage.getItem("userId") !== null;
};

const updateAuthButton = () => {
  const authButton = document.getElementById("authButton");

  if (isUserLoggedIn()) {
    authButton.textContent = "Log Out";
    authButton.onclick = logout; // Logout action
  } else {
    authButton.textContent = "Log In";
    authButton.onclick = () => {
      window.location.href = "/login.html"; // Redirect to login page
    };
  }
};

updateAuthButton();