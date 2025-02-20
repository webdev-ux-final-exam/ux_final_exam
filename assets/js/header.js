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
const updateHeader = (mobile = true) => {
  const authButton = document.getElementById(
    mobile ? "auth-btn-mobile" : "auth-btn"
  );
  const signupButton = document.getElementById(
    mobile ? "signup-btn-mobile" : "signup-btn"
  );
  const logoButton = document.getElementById(
    mobile ? "logo-btn-mobile" : "logo-btn"
  );
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

const toggleMobileMenu = (open) => {
  const mobileMenu = document.querySelector("#mobile-navigation");
  if (!open) {
    mobileMenu.classList.toggle("open");
  } else {
    mobileMenu.classList[open ? "add" : "remove"]("open");
  }
};

const openMobileMenuBtn = document.querySelector("header nav svg");
if (openMobileMenuBtn) {
  openMobileMenuBtn.addEventListener("click", () => {
    toggleMobileMenu(true);
  });
} else {
  console.error("No mobile menu button found!");
}

const closeMobileMenuBtn = document.querySelector("#mobile-navigation svg");
if (closeMobileMenuBtn) {
  closeMobileMenuBtn.addEventListener("click", () => {
    toggleMobileMenu(false);
  });
} else {
  console.error("No mobile menu button found!");
}
