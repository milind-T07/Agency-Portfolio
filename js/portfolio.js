/* ============================================
   PORTFOLIO.JS — Portfolio Page Logic
   ============================================
   Purpose: Handles the Agency Portfolio page functionality.
   
   Responsibilities:
   1. Contact form validation and submission
   2. Active nav link highlighting on scroll (scroll spy)
   3. Scroll-to-top button visibility
   
   NOTE: The hamburger menu is now handled in theme.js (shared).
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  initContactForm();
  initScrollSpy();
  initScrollToTop();
});

/* ============================================
   CONTACT FORM VALIDATION
   ============================================ */

// initContactForm() - Sets up contact form validation
function initContactForm() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    // Clear any previous error messages
    clearErrors();

    // Get the form field values
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    // Validate all fields
    const isValid = validateContactForm(name, email, message);

    if (isValid) {
      showSuccessMessage();
      form.reset();
    }
  });
}

// validateContactForm() - Checks that all contact form fields are filled correctly
function validateContactForm(name, email, message) {
  let isValid = true;

  if (name === "") {
    showError("contact-name", "Please enter your name.");
    isValid = false;
  }

  if (email === "") {
    showError("contact-email", "Please enter your email.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError("contact-email", "Please enter a valid email address.");
    isValid = false;
  }

  if (message === "") {
    showError("contact-message", "Please enter a message.");
    isValid = false;
  }

  return isValid;
}

// isValidEmail() - Checks if an email address has valid format
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// showError() - Displays an error message below a form field
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  field.classList.add("error");

  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;
  field.parentNode.appendChild(errorElement);
}

// clearErrors() - Removes all error messages and error styling from the form
function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(function (el) { el.remove(); });

  const errorFields = document.querySelectorAll(".error");
  errorFields.forEach(function (el) { el.classList.remove("error"); });

  const successMsg = document.querySelector(".success-message");
  if (successMsg) { successMsg.remove(); }
}

// showSuccessMessage() - Shows a success message after form submission
function showSuccessMessage() {
  const form = document.getElementById("contact-form");

  const successElement = document.createElement("div");
  successElement.className = "success-message";
  successElement.textContent = "Thank you! Your message has been sent successfully.";
  form.appendChild(successElement);

  // Remove success message after 5 seconds
  setTimeout(function () { successElement.remove(); }, 5000);
}

/* ============================================
   SCROLL SPY — Active Nav Link Highlighting
   ============================================
   Purpose: Highlights the nav link that corresponds to
   the section currently visible on screen.
   
   How it works:
   1. Gets all sections that have an ID matching a nav link
   2. On scroll, checks which section is in the viewport
   3. Adds "active" class to the corresponding nav link
   ============================================ */

// initScrollSpy() - Sets up scroll-based nav link highlighting
function initScrollSpy() {
  // Get all nav links that point to page sections (starting with #)
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = [];

  // Build an array of sections that correspond to nav links
  navLinks.forEach(function (link) {
    const sectionId = link.getAttribute("href").substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
      sections.push({ element: section, link: link });
    }
  });

  // Update active link on scroll
  window.addEventListener("scroll", function () {
    updateActiveNavLink(sections);
  });

  // Run once on page load
  updateActiveNavLink(sections);
}

// updateActiveNavLink() - Determines which section is currently visible and
function updateActiveNavLink(sections) {
  // How far from the top of the page we consider a section "active"
  const scrollPosition = window.scrollY + 120;

  // Remove active class from all links first
  sections.forEach(function (item) {
    item.link.classList.remove("active");
  });

  // Find the section currently in view (last one that's above scroll position)
  for (let i = sections.length - 1; i >= 0; i--) {
    if (scrollPosition >= sections[i].element.offsetTop) {
      sections[i].link.classList.add("active");
      break;
    }
  }
}

/* ============================================
   SCROLL-TO-TOP BUTTON
   ============================================
   Purpose: Shows a button when user scrolls down,
   clicking it smoothly scrolls back to the top.
   ============================================ */

// initScrollToTop() - Sets up the scroll-to-top button
function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scroll-top-btn");
  if (!scrollTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top when button is clicked
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
