// logout logic
export const logout = () => {
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("email");

  setTimeout(() => {
    window.location.href = "index.html";
    updateAuthButton();
  }, 1000);
};

// check if user is logged in
const isUserLoggedIn = () => {
  return sessionStorage.getItem("userId") !== null;
};

// change header based on whether or not the user is logged in
const updateHeader = () => {
  const authButton = document.getElementById("auth-btn");
  const signupButton = document.getElementById("signup-btn");
  const logoButton = document.getElementById("logo-btn");
  const userEmail = sessionStorage.getItem("email");
  const authorsPage = document.querySelector('[aria-label="Authors"]');
  const booksPage = document.querySelector('[aria-label="Books"]');
  const profilePage = document.querySelector('[aria-label="Profile"]');

  if (isUserLoggedIn()) {
    authButton.textContent = "Log Out";
    authButton.ariaLabel = "Log Out";
    authButton.onclick = logout;
    signupButton.classList.add("visually-hidden");
    profilePage.classList.remove("visually-hidden");

    if (userEmail === "admin.library@mail.com") {
      logoButton.href = "admin-homepage.html";
      if (authorsPage) authorsPage.classList.add("visually-hidden");
      if (booksPage) booksPage.classList.add("visually-hidden");
    } else {
      logoButton.href = "homepage.html";
    }
  } else {
    authButton.textContent = "Log In";
    authButton.ariaLabel = "Log In";
    authButton.href = "login.html";
    logoButton.href = "index.html";
  }
};

updateHeader();
