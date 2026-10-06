# Viva Preparation Guide — OJT Capstone Project

## How to Use This Guide

This guide covers every project in the capstone. For each project you'll find:
1. **Architecture** — how files are organized
2. **Data Flow** — how data moves through the app
3. **Key Concepts** — JavaScript concepts demonstrated
4. **Viva Questions** — likely questions with detailed answers
5. **Common Mistakes** — things to watch out for

---

## 1. Agency Portfolio

### Architecture

| File | Responsibility |
|------|---------------|
| `index.html` | Page structure and content |
| `css/global.css` | Shared styles, CSS variables, theme colors |
| `css/portfolio.css` | Portfolio-specific layout styles |
| `js/theme.js` | Dark/light theme toggle |
| `js/portfolio.js` | Mobile menu and contact form validation |

### Data Flow

```
User clicks theme toggle
  → theme.js reads current theme from DOM
  → Switches data-theme attribute on <html>
  → CSS variables automatically update all colors
  → New theme saved to localStorage

User submits contact form
  → portfolio.js prevents default form submission
  → Reads values from input fields
  → Validates each field (empty check, email format)
  → Shows error messages OR success message
```

### Key Concepts
- **CSS Custom Properties (Variables)**: `:root { --color-primary: #2a9d8f; }` — allows changing colors from one place
- **data-* attributes**: `data-theme="dark"` on `<html>` — custom attributes for storing data on elements
- **localStorage**: `localStorage.setItem("theme", "dark")` — saves data in the browser permanently
- **Form validation**: Checking user input before processing
- **Regex**: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` — pattern matching for email validation

### Viva Questions

**Q: How does the dark mode toggle work?**
A: When the user clicks the toggle button, the JavaScript function reads the current value of the `data-theme` attribute on the `<html>` element. If it's "light", it changes it to "dark" and vice versa. The CSS file has two sets of color variables — one for `:root` (light) and one for `[data-theme="dark"]`. When the attribute changes, the browser automatically uses the dark theme variables. The preference is saved to localStorage so it persists after refresh.

**Q: What are CSS Custom Properties and why use them?**
A: CSS Custom Properties (also called CSS variables) are values you define once and reuse throughout your stylesheet. For example, `--color-primary: #2a9d8f` is defined in `:root` and used as `color: var(--color-primary)` everywhere. This makes theming easy because you only need to change values in one place.

**Q: How does the email validation regex work?**
A: The pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` checks for: one or more characters that aren't spaces or @ signs, followed by an @ sign, followed by more characters, a dot, and more characters. It ensures the basic format `something@something.something`.

**Q: What does `event.preventDefault()` do?**
A: It stops the browser's default behavior. For forms, the default is to submit and refresh the page. By calling `preventDefault()`, we stop the refresh and handle the form submission with JavaScript instead.

### Common Mistakes
- Forgetting to call `preventDefault()` on form submit
- Not saving theme to localStorage (theme resets on refresh)
- Hardcoding colors instead of using CSS variables

---

## 2. Quiz App

### Architecture

| File | Responsibility |
|------|---------------|
| `js/state.js` | Questions array, score tracking, answer checking |
| `js/ui.js` | Rendering questions, options, results to DOM |
| `js/main.js` | Initializes the app on page load |

### Data Flow

```
App loads → main.js → renderStartScreen() [ui.js]

User clicks "Start Quiz"
  → resetQuizState() [state.js]
  → renderQuestion() [ui.js]

User clicks an option
  → selectAnswer(index) [state.js] → returns true/false
  → UI highlights correct/incorrect [ui.js]
  → Shows "Next" button

User clicks "Next"
  → moveToNextQuestion() [state.js]
  → If more questions: renderQuestion() [ui.js]
  → If finished: renderResults() [ui.js]

User clicks "Restart"
  → resetQuizState() [state.js]
  → renderQuestion() [ui.js]
```

### State Object Explained

```javascript
let quizState = {
  currentQuestionIndex: 0,   // Which question we're on (0-9)
  score: 0,                  // Number of correct answers
  selectedAnswer: null,      // Which option user clicked (0-3)
  isAnswered: false,         // Has user answered current question?
  isFinished: false          // Has user completed all questions?
};
```

### Key Concepts
- **State Object**: A single object that tracks all app data
- **Separation of Concerns**: state.js handles data, ui.js handles display
- **Dynamic DOM Rendering**: Using `innerHTML` to create elements from JavaScript
- **Data Attributes**: `data-index="0"` — storing data on HTML elements
- **Template Literals**: `` `Score: ${quizState.score}` `` — embedding variables in strings

### Viva Questions

**Q: What is a "state object" and why use one?**
A: A state object is a JavaScript object that holds all the important data for the application in one place. We use it because: (1) it's easy to find all data in one place, (2) any part of the app can read from it, (3) we can easily reset it, (4) it keeps our code organized.

**Q: Why is state.js separate from ui.js?**
A: This is called "separation of concerns." state.js only handles data (questions, score, answer checking). ui.js only handles what the user sees (rendering HTML, showing feedback). If we need to change how the quiz looks, we only edit ui.js. If we need to change quiz logic, we only edit state.js. This makes the code easier to maintain and debug.

**Q: How does the score get calculated?**
A: When the user clicks an option, `selectAnswer(selectedIndex)` compares the selected index with `currentQuestion.correctAnswer`. If they match, `quizState.score` is incremented by 1. At the end, `calculatePercentage()` divides the score by total questions and multiplies by 100.

**Q: What does `parseInt()` do and why is it needed?**
A: `parseInt()` converts a string to a number. When we read `data-index` from an HTML attribute, it comes as a string (e.g., "2"). We need it as a number to compare with `correctAnswer` (which is a number like 2).

### Common Mistakes
- Not preventing double-clicking on answers (fixed with `isAnswered` flag)
- Forgetting to reset state when restarting the quiz
- Comparing string "2" with number 2 (need `parseInt()`)

---

## 3. Expense Tracker

### Architecture

| File | Responsibility |
|------|---------------|
| `js/storage.js` | localStorage read/write operations |
| `js/state.js` | Transactions array, CRUD, calculations |
| `js/ui.js` | Rendering list, summary, form handling |
| `js/main.js` | Initializes app, loads data, sets up form |

### Data Flow

```
App loads
  → main.js
  → loadTransactions() [storage.js] → populates transactions array [state.js]
  → renderTransactions() [ui.js]
  → renderSummary() [ui.js]

User adds transaction
  → handleFormSubmit() [ui.js] → validates form
  → addTransaction() [state.js] → pushes to array
  → saveTransactions() [storage.js] → writes to localStorage
  → renderTransactions() + renderSummary() [ui.js]

User deletes transaction
  → handleDeleteTransaction() [ui.js] → confirm()
  → deleteTransaction() [state.js] → filters array
  → saveTransactions() [storage.js]
  → re-render
```

### Key Concepts
- **CRUD**: Create (add), Read (display), Update (edit), Delete (remove)
- **filter()**: Creates a new array keeping only elements that pass a test
- **reduce()**: Combines all elements of an array into a single value
- **localStorage**: Browser storage that persists across sessions
- **JSON.stringify/parse**: Converting between objects and strings for storage

### Viva Questions

**Q: How does filter() work? Give an example from your code.**
A: `filter()` creates a new array with only the elements that pass a test function. In our code:
```javascript
const incomeTransactions = transactions.filter(function(transaction) {
  return transaction.type === "income";
});
```
This goes through every transaction and keeps only those where `type` equals "income". A new array is returned — the original array is not changed.

**Q: How does reduce() work? Give an example from your code.**
A: `reduce()` takes an array and reduces it to a single value by running a function on each element. In our code:
```javascript
const totalIncome = incomeTransactions.reduce(function(sum, transaction) {
  return sum + transaction.amount;
}, 0);
```
It starts with `sum = 0`, then for each transaction, adds `transaction.amount` to `sum`. The final `sum` is the total income.

**Q: Why use localStorage instead of a database?**
A: localStorage is built into the browser — no server, no database setup needed. It's perfect for this project because: (1) data stays even after closing the browser, (2) it's simple to use with `getItem()` and `setItem()`, (3) no backend required. The limitation is that it only stores strings, so we use `JSON.stringify()` to convert objects to strings.

**Q: What happens if localStorage is full or disabled?**
A: Our code wraps localStorage operations in `try/catch` blocks. If localStorage fails (browser private mode, storage full), the catch block runs and shows an alert to the user. The app continues to work — it just won't save data between sessions.

**Q: How does the Edit feature work?**
A: When the user clicks Edit on a transaction: (1) We find the transaction by its ID, (2) Fill the form with its current values, (3) Change the button text to "Update Transaction", (4) Store the editing ID on the button using `data-editing-id`. When the form is submitted, we check if `data-editing-id` exists — if yes, we update the existing transaction instead of adding a new one.

### Common Mistakes
- Forgetting to parse amount as a number (`parseFloat()`)
- Not wrapping localStorage in try/catch
- Modifying the original array instead of creating a new one with filter()

---

## 4. News Feed

### Architecture

| File | Responsibility |
|------|---------------|
| `js/config.js` | API key and base URL |
| `js/api.js` | fetch() requests to NewsAPI |
| `js/ui.js` | Rendering article cards, spinner, errors |
| `js/main.js` | Initializes app, sets up search and filters |

### Data Flow

```
App loads → main.js → loadNews("general")
  → showLoading() [ui.js] → displays spinner
  → fetchTopHeadlines("general") [api.js]
    → builds URL with API key
    → await fetch(url) → gets response
    → await response.json() → parses JSON
    → returns { success, articles, error }
  → If success: renderArticles(articles) [ui.js]
  → If error: showNewsError(message) [ui.js]
```

### Key Concepts
- **async/await**: Modern way to handle asynchronous operations
- **fetch()**: Browser API for making HTTP requests
- **try/catch**: Error handling for async operations
- **Promises**: Objects representing eventual completion of async operations
- **JSON**: Data format used by most APIs

### Viva Questions

**Q: What is async/await and why do we use it?**
A: `async/await` is a way to write asynchronous code that looks synchronous. API calls take time — the browser can't wait and freeze. `async` marks a function as asynchronous. `await` pauses that function until the Promise resolves. Without it, we'd need nested `.then()` callbacks, which are harder to read.

```javascript
// With async/await (clean):
async function fetchNews() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Without (messy):
function fetchNews() {
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return data;
    });
}
```

**Q: What happens if the API call fails?**
A: We have three levels of error handling: (1) Network errors (no internet) — caught by the `catch` block, shows "Network error" message. (2) API errors (wrong key, rate limit) — caught by checking `response.status` (401 = invalid key, 429 = too many requests). (3) Empty results — checked by `articles.length === 0`, shows "No articles found" message.

**Q: Why is the API key in a separate config file?**
A: Keeping the API key in `config.js` means: (1) It's easy to find and update, (2) We don't accidentally expose it in other files, (3) Different developers can use different keys, (4) It follows the principle of separating configuration from code.

**Q: What does `encodeURIComponent()` do?**
A: It converts special characters in a string to URL-safe format. For example, spaces become `%20`, and `&` becomes `%26`. This is needed because URLs can't contain certain characters directly.

### Common Mistakes
- Forgetting to put API key in config.js (shows "not configured" error)
- Not running through a local server (CORS errors with file:// protocol)
- Not handling the case when no articles are returned

---

## 5. GitHub Explorer

### Architecture

| File | Responsibility |
|------|---------------|
| `js/config.js` | API base URL |
| `js/api.js` | GitHub API calls, language breakdown, sorting |
| `js/ui.js` | Profile card, repo list, language chart rendering |
| `js/main.js` | Search form setup, orchestrates API calls |

### Data Flow

```
User searches "octocat"
  → main.js → searchGitHubUser("octocat")
  → showGHLoading() [ui.js]
  → fetchGitHubUser("octocat") [api.js]
    → GET /users/octocat
    → returns user profile data
  → renderUserProfile(user) [ui.js]
  → fetchUserRepos("octocat") [api.js]
    → GET /users/octocat/repos
    → returns repos array
  → renderRepos(repos) [ui.js]
  → calculateLanguageBreakdown(repos) [api.js]
  → renderLanguageBreakdown(breakdown) [ui.js]
```

### Key Concepts
- **Multiple API Endpoints**: Two separate API calls for profile and repos
- **Data Transformation**: Converting raw API data into usable format
- **Sorting**: `Array.sort()` with compare functions
- **Rate Limiting**: Understanding API request limits
- **Object.keys()**: Getting all property names from an object

### Viva Questions

**Q: Why are there two separate API calls?**
A: The GitHub API provides user profile data and repository data at different endpoints. `/users/{username}` gives profile info (name, bio, followers). `/users/{username}/repos` gives the repository list. We make both calls because the user profile endpoint doesn't include detailed repo data.

**Q: How does the language breakdown work?**
A: The `calculateLanguageBreakdown()` function: (1) Loops through all repos, (2) Counts how many repos use each language using an object as a counter (`languageCounts[language]++`), (3) Calculates percentage for each language, (4) Sorts by count (most used first), (5) Returns an array of `{ language, count, percentage }` objects.

**Q: How does sorting work in JavaScript?**
A: `Array.sort()` takes a compare function that receives two elements (a, b). If the function returns a negative number, `a` comes first. If positive, `b` comes first. If zero, order stays the same. For descending order (highest first): `return b.stars - a.stars`.

**Q: What is API rate limiting?**
A: Rate limiting is when an API restricts how many requests you can make in a time period. GitHub allows 60 requests per hour without authentication. If you exceed this, the API returns a 403 error. Our code checks for this status code and shows a user-friendly message.

### Common Mistakes
- Not handling 404 (user not found) gracefully
- Forgetting that some profile fields can be null (bio, location)
- Not creating a copy of the array before sorting (`slice()` first)

---

## 6. Kanban Board

### Architecture

| File | Responsibility |
|------|---------------|
| `js/storage.js` | localStorage read/write for board state |
| `js/state.js` | Board data structure, task CRUD, move logic |
| `js/dragdrop.js` | HTML5 Drag and Drop event handlers |
| `js/ui.js` | Column/task rendering, modal, mobile buttons |
| `js/main.js` | Initializes app, sets up modal and buttons |

### Data Flow

```
Board State:
{
  todo: [{ id: 1234, title: "...", description: "..." }, ...],
  inprogress: [...],
  done: [...]
}

Drag and Drop Flow:
1. User starts dragging a task card
   → dragstart event fires
   → Stores taskId and sourceColumn in dataTransfer

2. User drags over a column
   → dragover fires → preventDefault() (allows drop)
   → dragenter fires → adds visual highlight

3. User drops the card
   → drop event fires
   → Reads taskId and sourceColumn from dataTransfer
   → Determines target column from the drop zone
   → moveTask(from, to, taskId) [state.js]
   → saveBoardState() [storage.js]
   → renderBoard() [ui.js]
```

### Key Concepts
- **HTML5 Drag and Drop API**: Built-in browser feature for dragging elements
- **dataTransfer**: Object that carries data during a drag operation
- **Complex State**: Nested object with multiple arrays
- **Modal Pattern**: Overlay dialog for user input
- **Event Delegation**: Using parent events instead of individual ones
- **splice()**: Inserting/removing elements at specific array positions

### Viva Questions

**Q: How does HTML5 Drag and Drop work?**
A: HTML5 DnD uses six main events:
1. `dragstart` — fires when user starts dragging (we store task data)
2. `dragover` — fires while dragging over a target (must `preventDefault()` to allow drop)
3. `dragenter` — fires when entering a target (we add visual highlight)
4. `dragleave` — fires when leaving a target (we remove highlight)
5. `drop` — fires when released on target (we move the task)
6. `dragend` — fires when drag ends (cleanup)

We need `draggable="true"` on the task cards to make them draggable.

**Q: What is the `dataTransfer` object?**
A: `dataTransfer` is a built-in object that carries data during a drag operation. In `dragstart`, we store the task ID and source column using `event.dataTransfer.setData("text/taskId", id)`. In the `drop` handler, we read it back using `event.dataTransfer.getData("text/taskId")`. This is how the drop target knows which task was dragged.

**Q: Why are there mobile move buttons?**
A: HTML5 Drag and Drop doesn't work on touch screens (mobile/tablet). So we provide "Move Left" and "Move Right" buttons as a fallback. These buttons are hidden on desktop (via CSS `display: none`) and shown on mobile screens.

**Q: How does the modal work?**
A: The modal is an overlay `<div>` that's hidden by default (`display: none`). When the user clicks "Add Task" or "Edit", we: (1) Set the modal content (empty for add, pre-filled for edit), (2) Add the `active` class which sets `display: flex`, (3) Focus the title input. When saving, we check if `data-editing-id` exists on the save button — if yes, it's an update; if no, it's an add. Clicking outside the modal or the X button closes it.

**Q: Why does moveTask use filter() instead of splice()?**
A: `filter()` creates a new array without the task, which is cleaner and less error-prone than finding the index and using `splice()`. The task is then pushed to the destination column's array. It's the simpler approach.

### Common Mistakes
- Forgetting `event.preventDefault()` in `dragover` (drop won't work)
- Not setting `draggable="true"` on task cards
- Forgetting to re-initialize drag-and-drop after re-rendering
- Not handling the mobile fallback (touch screens can't drag)

---

## General Viva Questions

### JavaScript Fundamentals

**Q: What is the difference between `let`, `const`, and `var`?**
A: `var` is function-scoped and can be redeclared. `let` is block-scoped and can be reassigned. `const` is block-scoped and cannot be reassigned. We use `const` for values that won't change and `let` for values that will.

**Q: What is the DOM?**
A: DOM stands for Document Object Model. It's a tree-like representation of the HTML page that JavaScript can interact with. We use methods like `document.getElementById()` to select elements and `.innerHTML` to modify content.

**Q: What is the difference between `==` and `===`?**
A: `==` checks value only (with type coercion): `"5" == 5` is true. `===` checks both value and type: `"5" === 5` is false. We always use `===` to avoid unexpected type coercion bugs.

**Q: What is an event listener?**
A: An event listener is a function that runs when a specific event happens on an element. For example, `button.addEventListener("click", handleClick)` runs `handleClick` every time the button is clicked.

**Q: What is the difference between `innerHTML` and `textContent`?**
A: `innerHTML` sets or gets HTML content (parses HTML tags). `textContent` sets or gets plain text only (HTML tags are treated as text). Use `textContent` when you don't need HTML parsing — it's safer against XSS attacks.

### Architecture Questions

**Q: Why separate state.js and ui.js?**
A: Separation of concerns. `state.js` handles data (what the data IS), `ui.js` handles display (what the user SEES). Benefits: (1) Easier to debug — if data is wrong, check state.js; if display is wrong, check ui.js. (2) Easier to change — you can redesign the UI without touching data logic. (3) Easier to test — you can test state functions without needing a browser.

**Q: What is localStorage and how does it work?**
A: localStorage is a browser API that stores key-value pairs. Data persists even after closing the browser. It only stores strings, so we use `JSON.stringify()` to save objects and `JSON.parse()` to read them back. Each domain gets about 5MB of storage.

**Q: Why wrap localStorage in try/catch?**
A: localStorage can fail for several reasons: (1) Browser is in private/incognito mode, (2) Storage is full (5MB limit), (3) User has disabled storage. The try/catch prevents the app from crashing — instead, it shows a user-friendly error message.

### Debugging Questions

**Q: How would you debug a function that's not working?**
A: (1) Open browser DevTools (F12), (2) Check the Console tab for errors, (3) Add `console.log()` statements to trace values, (4) Use breakpoints in the Sources tab to step through code, (5) Check the Network tab for API issues.

**Q: How would you find why a button click doesn't work?**
A: (1) Check if the event listener is attached (`console.log` inside the handler), (2) Check if the button ID/class matches the selector, (3) Check if the button exists in the DOM when the listener is added, (4) Check for typos in the event name.

### Follow-Up Questions

**Q: How would you add a new feature to the Quiz App (e.g., timer)?**
A: Add a `timeRemaining` field to `quizState` in state.js. Create a `startTimer()` function that uses `setInterval()` to count down every second. In ui.js, display the timer and update it each second. When time runs out, auto-select no answer and move to the next question.

**Q: How would you make the Expense Tracker support categories?**
A: Add a "category" field to the transaction object and a category dropdown to the form. Add a category filter above the transaction list. Use `filter()` to show only transactions matching the selected category.

**Q: How would you add pagination to the News Feed?**
A: Add a `page` variable to track the current page. Send `&page=${page}` in the API request. Add "Previous" and "Next" buttons. Increment/decrement the page number and re-fetch when clicked. Disable "Previous" on page 1.
