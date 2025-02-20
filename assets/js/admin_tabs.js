document.addEventListener("DOMContentLoaded", function () {
  const tabContainer = document.querySelector(".tab");
  const tablinks = document.querySelectorAll(".tablinks");
  const tabContents = document.querySelectorAll(".tabcontent");

  // hide all tab content by default
  tabContents.forEach((content) => {
    content.style.display = "none";
  });

  // add event listener to each tab button
  tablinks.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      if (e.target.id === "openMenu") {
        tabContainer.classList.toggle("open");
        return;
      }

      // hide all content
      tabContents.forEach((content) => {
        content.style.display = "none";
      });

      // remove 'active' class from all buttons
      tablinks.forEach((button) => {
        button.classList.remove("active");
      });

      // Show the content of the clicked tab
      const tabId = this.id.replace("tab", ""); // remove 'tab' prefix
      document.getElementById(tabId).style.display = "block";

      this.classList.add("active");
      tabContainer.classList.remove("open");
    });
  });
  document.getElementById("AddBook").style.display = "block";
  document.getElementById("tabAddBook").classList.add("active");
});
