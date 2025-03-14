// Footnote
const year = document.querySelector("#currentYear");
const today = new Date();
let lastModDate = new Date(document.lastModified);

year.innerHTML = `&copy${today.getFullYear()}`;
document.getElementById(
  "lastModified"
).textContent = `Last modified on: ${lastModDate.toDateString()} at ${lastModDate.toLocaleTimeString()}`;


// Menu
const menuBtn = document.querySelector("#menu");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});