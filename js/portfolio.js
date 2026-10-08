/* ============================================
   PORTFOLIO.JS — Agency Portfolio Page Logic
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  initContactForm();
  initScrollSpy();
  initScrollToTop();
  initProjectFilters();
  initQuickViewModal();
});

/* ============================================
   PROJECT CATEGORY FILTERING
   ============================================ */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach(function (card) {
        const category = card.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          card.style.display = "flex";
          card.style.animation = "fadeIn 0.3s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ============================================
   QUICK VIEW MODAL
   ============================================ */
const projectDetailsData = {
  quiz: {
    title: "Interactive Quiz App",
    badge: "State & Logic",
    image: "assets/images/quiz-app.jpg",
    author: "Sophia Rodriguez",
    description: "A dynamic quiz application designed to test subject knowledge with instant score calculations, countdown timer, question progression, and detailed score feedback.",
    features: [
      "Dynamic question loading and state management",
      "Timer integration with automated submission",
      "Score summary with breakdown by topic",
      "Full dark mode support with CSS variables"
    ],
    tech: ["HTML5", "CSS3 Flexbox", "Vanilla ES6 JS", "DOM API"],
    url: "https://iamshkzahid.github.io/interactive-quiz-app/"
  },
  expense: {
    title: "Expense Tracker",
    badge: "CRUD & localStorage",
    image: "assets/images/expense-tracker.jpg",
    author: "Aarav Patel",
    description: "Personal finance and budget manager enabling users to track income and expenditure items with full CRUD operations, category filters, and persistent local storage.",
    features: [
      "Add, edit, filter, and delete transaction items",
      "Automated total balance and income/expense calculation",
      "Data persistence across sessions using localStorage",
      "Filter transactions by Income, Expense, or Date"
    ],
    tech: ["JavaScript Array Methods", "localStorage API", "DOM Mutation", "CSS Grid"],
    url: "https://iamshkzahid.github.io/expense-tracker/"
  },
  news: {
    title: "Live News Feed",
    badge: "Async API Integration",
    image: "assets/images/news-feed.jpg",
    author: "Elena Rostova",
    description: "Real-time news feed aggregator pulling trending global news articles with search filters, article topic categories, responsive card grids, and error state handling.",
    features: [
      "Asynchronous REST API fetching using fetch() and async/await",
      "Search bar with debounce and category filtering pills",
      "Loading skeleton & error feedback components",
      "Responsive thumbnail grid layout"
    ],
    tech: ["REST API (NewsAPI)", "Async/Await", "JSON Parsing", "CSS Grid"],
    url: "https://iamshkzahid.github.io/live-news-feed/"
  },
  github: {
    title: "GitHub Developer Explorer",
    badge: "Multi-Endpoint API",
    image: "assets/images/github-explorer.jpg",
    author: "Maya Lin",
    description: "Developer profile search engine connecting to GitHub REST API v3 to display profile details, follower counts, repository listings, star counts, and top languages.",
    features: [
      "Multi-endpoint data fetching (Users, Repos, Followers)",
      "Repository sorting by Stars, Forks, or Updated Date",
      "Rate-limit handling with user-friendly error banners",
      "Direct link generation to user repositories"
    ],
    tech: ["GitHub REST API", "Debounce Search", "Async JavaScript", "Glassmorphism UI"],
    url: "https://zenthar-dev.github.io/github-developer-explorer/"
  },
  kanban: {
    title: "Kanban Task Board",
    badge: "Drag & Drop",
    image: "assets/images/kanban-board.jpg",
    author: "Elena Rostova",
    description: "Productivity board implementing HTML5 Drag and Drop API to move tasks across To Do, In Progress, and Done columns with full state persistence.",
    features: [
      "Native HTML5 Drag and Drop event listeners",
      "Create, edit, and delete task cards with priority badges",
      "Automatic column task count badges",
      "Persistent column order in localStorage"
    ],
    tech: ["HTML5 Drag & Drop API", "localStorage Sync", "CSS Transitions", "DOM Manipulation"],
    url: "https://iamshkzahid.github.io/kanban-task-board/"
  }
};

function initQuickViewModal() {
  const modal = document.getElementById("quick-view-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const modalContent = document.getElementById("modal-content");
  const quickViewBtns = document.querySelectorAll(".quick-view-btn");

  if (!modal || !modalContent) return;

  quickViewBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const projectKey = btn.getAttribute("data-project");
      const details = projectDetailsData[projectKey];

      if (details) {
        modalContent.innerHTML = `
          <div style="margin-bottom: 16px;">
            <span class="project-overlay-badge" style="position: static; display: inline-block; margin-bottom: 8px;">${details.badge}</span>
            <h2 style="font-family: var(--font-family-heading); font-size: 1.75rem; font-weight: 800; margin-bottom: 4px;">${details.title}</h2>
            <p style="font-size: 0.85rem; color: var(--color-primary); font-weight: 600;">Lead Developer: ${details.author}</p>
          </div>

          <div style="width: 100%; height: 220px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 20px;">
            <img src="${details.image}" alt="${details.title}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>

          <p style="font-size: 0.95rem; color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 20px;">${details.description}</p>

          <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 10px; color: var(--color-text);">Key Engineering Highlights:</h4>
          <ul style="list-style: disc; padding-left: 20px; margin-bottom: 20px; font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.7;">
            ${details.features.map(f => `<li>${f}</li>`).join('')}
          </ul>

          <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 10px; color: var(--color-text);">Technologies Implemented:</h4>
          <div class="tech-tags" style="margin-bottom: 24px;">
            ${details.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>

          <div style="display: flex; gap: 12px;">
            <a href="${details.url}" target="_blank" rel="noopener" class="btn btn-hero-primary" style="flex: 1; text-align: center;">Launch Live Web App ↗</a>
          </div>
        `;
        modal.classList.add("active");
      }
    });
  });

  closeBtn.addEventListener("click", function () {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

/* ============================================
   CONTACT FORM VALIDATION
   ============================================ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    const isValid = validateContactForm(name, email, message);

    if (isValid) {
      showSuccessMessage();
      form.reset();
    }
  });
}

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

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  field.classList.add("error");

  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;
  field.parentNode.appendChild(errorElement);
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(function (el) { el.remove(); });

  const errorFields = document.querySelectorAll(".error");
  errorFields.forEach(function (el) { el.classList.remove("error"); });

  const successMsg = document.querySelector(".success-message");
  if (successMsg) { successMsg.remove(); }
}

function showSuccessMessage() {
  const form = document.getElementById("contact-form");

  const successElement = document.createElement("div");
  successElement.className = "success-message";
  successElement.textContent = "Thank you! Your message has been sent successfully.";
  form.appendChild(successElement);

  setTimeout(function () { successElement.remove(); }, 5000);
}

/* ============================================
   SCROLL SPY & SCROLL-TO-TOP
   ============================================ */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = [];

  navLinks.forEach(function (link) {
    const sectionId = link.getAttribute("href").substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
      sections.push({ element: section, link: link });
    }
  });

  window.addEventListener("scroll", function () {
    updateActiveNavLink(sections);
  });

  updateActiveNavLink(sections);
}

function updateActiveNavLink(sections) {
  const scrollPosition = window.scrollY + 120;

  sections.forEach(function (item) {
    item.link.classList.remove("active");
  });

  for (let i = sections.length - 1; i >= 0; i--) {
    if (scrollPosition >= sections[i].element.offsetTop) {
      sections[i].link.classList.add("active");
      break;
    }
  }
}

function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scroll-top-btn");
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

