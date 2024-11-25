export function toast(message, type = "success", duration = 5000) {
  const toastContainer = document.getElementById("toast-container");

  // Create the toast element
  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.textContent = message;

  // Append toast to container
  toastContainer.appendChild(toast);

  // Trigger show animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 500);

  // Remove the toast after the specified duration
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, duration);
}
