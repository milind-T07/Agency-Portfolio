# 🚀 Dev Agency — Engineering Showcase

[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Modern_Grid_%26_Flex-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A premier agency portfolio showcasing five full-stack web applications engineered with **100% pure HTML5, CSS3, and ES6+ Vanilla JavaScript** — zero framework dependencies.

---

## 🌟 Live Applications Showcase

| # | Project Name | Focus Area | Technology Highlights | Live Demo |
|---|--------------|------------|-----------------------|-----------|
| 1 | **Interactive Quiz App** | State & Logic | Dynamic Question Engine, Timer & Score Calculation | [Live Demo ↗](https://iamshkzahid.github.io/interactive-quiz-app/) |
| 2 | **Expense Tracker** | CRUD & Storage | localStorage Persistence, Array Reducers, Income/Expense Stats | [Live Demo ↗](https://iamshkzahid.github.io/expense-tracker/) |
| 3 | **Live News Feed** | Async REST API | Fetch API, Async/Await, NewsAPI Integration, Category Filters | [Live Demo ↗](https://iamshkzahid.github.io/live-news-feed/) |
| 4 | **GitHub Developer Explorer** | Multi-Endpoint API | GitHub REST API v3, User Profile Stats & Repo Sorting | [Live Demo ↗](https://zenthar-dev.github.io/github-developer-explorer/) |
| 5 | **Kanban Task Board** | Drag & Drop | Native HTML5 DnD, Column State Persistence, Dynamic CRUD | [Live Demo ↗](https://iamshkzahid.github.io/kanban-task-board/) |

---

## 👥 Engineering Team

- **Sophia Rodriguez** — Lead Frontend Architect
- **Aarav Patel** — Senior Full Stack Developer
- **Elena Rostova** — Lead UI/UX Designer
- **Maya Lin** — Product & Performance Engineer

---

## 📁 Repository Structure

```
team-agency-portfolio/
├── index.html                  ← Agency Landing Page & Showcase
├── css/
│   ├── global.css              ← Design Tokens, Glassmorphism, Responsive Grid
│   └── portfolio.css           ← Hero styling, cards, modal, dark theme
├── js/
│   ├── theme.js                ← Shared Theme Toggle (Dark/Light)
│   └── portfolio.js            ← Category Filter, Quick View Modal, Scroll Spy
├── assets/
│   └── images/                 ← High-Resolution Web App & Team Previews
└── README.md                   ← Project Documentation
```

## 🛠️ Architecture & Technical Highlights

- **Zero-Framework Overhead**: Clean DOM manipulation and state isolation without React, Vue, or Angular.
- **Glassmorphic Design System**: Modern dark & light mode UI with CSS Custom Properties and HSL palette.
- **Interactive Quick View Modal**: Modal dialogs displaying project architecture and lead developer credits.
- **Responsive Category Filtering**: Instant client-side filtering by project complexity and technical focus.
- **Form Validation & UX**: Real-time email and input validation with custom feedback alerts.

## 📦 Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/milind-T07/Agency-Portfolio.git
   cd Agency-Portfolio
   ```

2. **Run locally**:
   Open `index.html` in your browser or run a simple local web server (e.g., VS Code Live Server or `python3 -m http.server`).

3. **Open the project** in your code editor.

4. **For most projects**, simply open `index.html` in your browser:
   - Double-click `index.html`, or
   - Right-click → "Open with" → your browser

5. **For the News Feed** (requires a server due to API calls):
   ```bash
   # Install live-server globally (one-time setup)
   npm install -g live-server

   # Run the local server
   live-server
   ```
   This opens the project at `http://127.0.0.1:8080`

## 📖 Usage Guide

### Agency Portfolio (Main Page)
- Navigate through sections using the navbar links
- Toggle dark/light mode with the Dark/Light toggle
- Click project cards to visit each sub-project
- Submit the contact form (client-side validation only)

### Quiz App
- Click "Start Quiz" to begin
- Select an answer for each question
- See immediate feedback (green = correct, red = incorrect)
- View your final score and percentage
- Click "Restart Quiz" to try again

### Expense Tracker
- Add transactions with description, amount, and type (income/expense)
- View running totals for income, expenses, and balance
- Edit or delete transactions
- Data persists across browser sessions via localStorage

### News Feed
- Browse top headlines loaded on page open
- Click category buttons to filter by topic
- Use the search bar to search all articles by keyword
- Click "Read Full Article" to open the source

### GitHub Explorer
- Enter a GitHub username and click Search
- View profile details (avatar, bio, followers, repos)
- Sort repositories by stars, forks, or recently updated
- View language breakdown chart

### Kanban Board
- Click the "+" button on any column to add a task
- Drag and drop tasks between columns (desktop)
- Use "Move Left" / "Move Right" buttons on mobile
- Edit or delete tasks with the Edit and Delete buttons
- Board state persists in localStorage

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| News feed shows "API key not configured" | Add your NewsAPI key in `news-feed/js/config.js` |
| News feed shows CORS error | Run the project through a local server (`live-server`) |
| GitHub search shows "Rate limit exceeded" | Wait an hour, or reduce search frequency |
| Theme doesn't persist | Check if localStorage is enabled in your browser |
| Drag and drop not working on mobile | Use the "Move Left/Right" buttons instead |
| Page styles look wrong | Make sure `css/global.css` is accessible from the sub-project path |

## 📄 License

This project is licensed under the MIT License.
