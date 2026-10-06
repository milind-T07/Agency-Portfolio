# OJT Capstone Project — Dev Agency

A complete suite of six web applications built with pure HTML5, CSS3, and Vanilla JavaScript (ES6+). No frameworks, no libraries — just fundamentals.

## 🚀 Projects

| # | Project | Focus Area | Key Concepts |
|---|---------|-----------|--------------|
| 1 | **Agency Portfolio** | DOM & Layout | Hero section, contact form validation, theme toggle |
| 2 | **Quiz App** | State & Logic | State object, dynamic rendering, score calculation |
| 3 | **Expense Tracker** | CRUD & localStorage | filter(), reduce(), CRUD operations, persistence |
| 4 | **News Feed** | Async API | fetch(), async/await, error handling, search/filter |
| 5 | **GitHub Explorer** | Multi-Endpoint API | Multiple API calls, data transformation, sorting |
| 6 | **Kanban Board** | Drag & Drop | HTML5 DnD API, complex state, modal, persistence |

## 📁 Folder Structure

```
ojt-capstone-project/
├── index.html                  ← Main landing page (Agency Portfolio)
├── css/
│   ├── global.css              ← Shared styles, theme variables, reset
│   └── portfolio.css           ← Portfolio page styles
├── js/
│   ├── theme.js                ← Dark/light mode toggle
│   └── portfolio.js            ← Contact form, mobile menu
│
├── quiz-app/
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── state.js            ← Questions data, score tracking
│       ├── ui.js               ← DOM rendering
│       └── main.js             ← App initialization
│
├── expense-tracker/
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── storage.js          ← localStorage read/write
│       ├── state.js            ← Transactions array, CRUD, calculations
│       ├── ui.js               ← DOM rendering, form validation
│       └── main.js             ← App initialization
│
├── news-feed/
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── config.js           ← API key configuration
│       ├── api.js              ← fetch() calls to NewsAPI
│       ├── ui.js               ← DOM rendering
│       └── main.js             ← App initialization
│
├── github-explorer/
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── config.js           ← API configuration
│       ├── api.js              ← GitHub API calls
│       ├── ui.js               ← DOM rendering
│       └── main.js             ← App initialization
│
├── kanban-board/
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── storage.js          ← localStorage read/write
│       ├── state.js            ← Board state, task CRUD
│       ├── ui.js               ← DOM rendering, modal
│       ├── dragdrop.js         ← HTML5 Drag and Drop handlers
│       └── main.js             ← App initialization
│
├── documentation/
│   └── viva-guide.md           ← Viva preparation guide
│
└── README.md                   ← This file
```

## 🛠️ Technologies Used

- **HTML5** — Semantic markup, forms, accessibility attributes
- **CSS3** — Custom properties, Flexbox, CSS Grid, media queries
- **JavaScript (ES6+)** — DOM manipulation, fetch API, async/await, localStorage
- **APIs** — NewsAPI (news-feed), GitHub REST API (github-explorer)

## 📦 Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- A code editor (VS Code recommended)
- A local development server (for the News Feed project)

### Steps

1. **Clone or download** the project:
   ```bash
   git clone <repository-url>
   cd ojt-capstone-project
   ```

2. **Open the project** in your code editor.

3. **For most projects**, simply open `index.html` in your browser:
   - Double-click `index.html`, or
   - Right-click → "Open with" → your browser

4. **For the News Feed** (requires a server due to API calls):
   ```bash
   # Install live-server globally (one-time setup)
   npm install -g live-server

   # Run the local server
   live-server
   ```
   This opens the project at `http://127.0.0.1:8080`

## 🔑 API Configuration

### NewsAPI (News Feed)

1. Go to [https://newsapi.org/](https://newsapi.org/) and create a free account.
2. Copy your API key from the dashboard.
3. Open `news-feed/js/config.js`.
4. Replace `"YOUR_API_KEY_HERE"` with your actual API key:
   ```javascript
   apiKey: "your-actual-api-key-here"
   ```

> **Note:** The free tier of NewsAPI only works on `localhost`. It will not work on deployed sites.

### GitHub API (GitHub Explorer)

No configuration needed! The GitHub REST API works without authentication. However, unauthenticated requests are limited to **60 per hour**.

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

## 🔮 Future Improvements

- Add user authentication for the Expense Tracker
- Implement pagination for the News Feed
- Add GitHub OAuth for higher API rate limits
- Add task priorities and due dates to the Kanban Board
- Add a timer/countdown mode to the Quiz App
- Deploy the portfolio using GitHub Pages or Netlify
- Add unit tests for state management functions

## 👥 Team Members Project 

- **Zahid Shaikh** — Team-Agency-Portfolio & Quize App 
- Sauryaman Bisen — Live-News-Feed & Kanban Board
- Milind Thakare — Expence-Tracker
- Sankalp Tiwari — Github-Explorer

## 📄 License

This project was created as part of the OJT (On-the-Job Training) Capstone program. For educational purposes only.
