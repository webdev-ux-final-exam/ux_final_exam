// logout logic
export const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("email");

  setTimeout(() => {
    window.location.href = "/index.html"; 
    updateAuthButton(); 
  }, 1000);
};

// check if user is logged in
const isUserLoggedIn = () => {
  return localStorage.getItem("userId") !== null;
};

// change header based on whether or not the user is logged in 
const updateHeader = () => {
  const authButton = document.getElementById("auth-btn");
  const signupButton = document.getElementById("signup-btn")
  const logoButton = document.getElementById("logo-btn")
  const userEmail  = localStorage.getItem("email")

  if (isUserLoggedIn()) {
    authButton.textContent = "Log Out";
    authButton.ariaLabel = "Log Out"
    authButton.onclick = logout;
    signupButton.style.display = "none"
    if (userEmail === "admin.library@mail.com") {
      logoButton.href = "/admin_homepage.html"
    } else {
      logoButton.href = "/homepage.html"
    }

  } else {
    authButton.textContent = "Log In";
    authButton.href = "/login.html"; 
  }
};

updateHeader();