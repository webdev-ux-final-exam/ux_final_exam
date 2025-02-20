import { toast } from "./toast.js";
import ApiHandler from "./ApiHandler.js";

// check if user is logged in
window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem("userId")) {
    window.location.href = "homepage.html";
  }
});

const api = new ApiHandler();

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fields = [
    { id: "first_name", validator: validateName },
    { id: "last_name", validator: validateName },
    { id: "email", validator: validateEmail },
    { id: "address", validator: validateAddress },
    { id: "phone_number", validator: validatePhoneNumber },
    { id: "birth_date", validator: validateBirthDate },
    { id: "password", validator: validatePassword },
  ];

  let isValid = true;

  const handleValidation = (input, validator) => {
    const errorMessage = validator(input.value.trim());
    if (errorMessage) {
      input.classList.add("error");
      toast(errorMessage, "error");
      isValid = false;
    } else {
      input.classList.remove("error");
    }
  };

  // checks if the input field is empty
  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    if (!input.value.trim()) {
      input.classList.add("error");
      isValid = false;
    } else {
      handleValidation(input, field.validator);
    }
  });

  // validate password match
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm_password").value.trim();
  const passwordMatch = validatePasswordMatch(password, confirmPassword);

  const confirmPasswordField = document.getElementById("confirm_password");
  if (confirmPassword === "") {
    confirmPasswordField.classList.add("error");
    isValid = false;
  } else if (passwordMatch) {
    confirmPasswordField.classList.add("error");
    toast(passwordMatch, "error");
    isValid = false;
  } else {
    confirmPasswordField.classList.remove("error");
  }

  // submit the form and create the user if all validations pass
  if (isValid) {
    const formData = collectFormData(fields);
    console.log("Data sent to API:", formData);

    try {
      await api.createUser(formData);
      toast("Sign up completed successfully!", "success");
      signupForm.reset();
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
    }
  }
});

// collect data from form
function collectFormData(fields) {
  const data = {};
  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    data[field.id] = input.value.trim();
  });
  return data;
}

// validators
function validateName(value) {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  return nameRegex.test(value) ? "" : "Name must only contain letters and be between 2 to 50 characters.";
}

function validateEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? "" : "Please enter a valid email address.";
}

function validateAddress(value) {
  return value.length >= 5 ? "" : "Address must be at least 5 characters.";
}

function validatePhoneNumber(value) {
  const phoneRegex = /^\+?\d{8,10}$/;
  return phoneRegex.test(value) ? "" : "Phone number must be between 8 to 10 digits.";
}

function validateBirthDate(value) {
  const today = new Date();
  const birthDate = new Date(value);
  return birthDate <= today ? "" : "Birth date cannot be in the future.";
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password)
    ? ""
    : "Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.";
}

function validatePasswordMatch(password, confirmPassword) {
  return password === confirmPassword ? "" : "Passwords do not match.";
}
