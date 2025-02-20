import { toast } from "./toast.js";
import ApiHandler from "./ApiHandler.js";

// check if user is not logged in
window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("userId")) {
    window.location.href = "/";
  }
});

const api = new ApiHandler();

const editProfileForm = document.getElementById("editProfileForm");

const userId = localStorage.getItem("userId");
api.getUser(userId).then((response) => {
  const user = response.data;
  for (const [key, value] of Object.entries(user)) {
    const input = document.getElementById(key);
    if (input) {
      input.value = value;
    }
  }
});

editProfileForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const submitButton = editProfileForm.querySelector("button[type=submit]");

  const fields = [
    { id: "first_name", validator: validateName },
    { id: "last_name", validator: validateName },
    { id: "email", validator: validateEmail },
    { id: "address", validator: validateAddress },
    { id: "phone_number", validator: validatePhoneNumber },
    { id: "birth_date", validator: validateBirthDate },
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

  if (isValid) {
    const formData = collectFormData(fields);
    console.log("Data sent to API:", formData);

    try {
      submitButton.disabled = true;
      await api.updateUser(userId, formData);
      submitButton.disabled = false;
      toast("Updated profile successfully!", "success");
    } catch (err) {
      submitButton.disabled = false;
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
  return nameRegex.test(value)
    ? ""
    : "Name must only contain letters and be between 2 to 50 characters.";
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
  return phoneRegex.test(value)
    ? ""
    : "Phone number must be between 8 to 10 digits.";
}

function validateBirthDate(value) {
  const today = new Date();
  const birthDate = new Date(value);
  return birthDate <= today ? "" : "Birth date cannot be in the future.";
}
