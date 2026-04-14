# expressBookReview 📚

A server-side Node.js/Express application for an online bookstore with user authentication and book review management.

> Forked from: `ibm-developer-skills-network/expressBookReview`

---

## Setup & Run

```bash
npm install
node index.js
```

Server runs on `http://localhost:5000`

---

## Project Structure

```
expressBookReview/
├── index.js              # Express server entry point
├── books.js              # Book data (JSON)
├── router/
│   ├── general.js        # Public routes + async/await with Axios (Task 11)
│   └── auth_users.js     # Authenticated routes (register, login, reviews)
└── package.json
```

---

## API Endpoints & cURL Commands

### Task 1 — GitHub Repo (forked from ibm-developer-skills-network/expressBookReview)
```
https://github.com/AishwaryaT123/expressBookReview
```

---

### Task 2 — Get All Books (`getallbooks`)
```bash
curl -X GET http://localhost:5000/
```
**Output:**
```json
{
  "1": { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
  "2": { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
  ...
}
```

---

### Task 3 — Get Book by ISBN (`getbooksbyISBN`)
```bash
curl -X GET http://localhost:5000/isbn/1
```
**Output:**
```json
{ "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} }
```

---

### Task 4 — Get Books by Author (`getbooksbyauthor`)
```bash
curl -X GET http://localhost:5000/author/Chinua%20Achebe
```
**Output:**
```json
[{ "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} }]
```

---

### Task 5 — Get Books by Title (`getbooksbytitle`)
```bash
curl -X GET http://localhost:5000/title/Things%20Fall%20Apart
```
**Output:**
```json
[{ "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} }]
```

---

### Task 6 — Get Book Review (`getbookreview`)
```bash
curl -X GET http://localhost:5000/review/1
```
**Output:**
```json
{}
```

---

### Task 7 — Register New User (`register`)
```bash
curl -X POST http://localhost:5000/customer/register \
  -H "Content-Type: application/json" \
  -d '{"username": "aishwarya", "password": "pass123"}'
```
**Output:**
```json
{ "message": "User 'aishwarya' registered successfully!" }
```

---

### Task 8 — Login (`login`)
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username": "aishwarya", "password": "pass123"}' \
  -c cookies.txt
```
**Output:**
```json
{ "message": "User 'aishwarya' logged in successfully!", "token": "<JWT_TOKEN>" }
```

---

### Task 9 — Add/Update Review (`reviewadded`)
```bash
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=This+is+an+amazing+book!" \
  -b cookies.txt
```
**Output:**
```json
{
  "message": "Review by 'aishwarya' added/updated successfully!",
  "reviews": { "aishwarya": "This is an amazing book!" }
}
```

---

### Task 10 — Delete Review (`deletereview`)
```bash
curl -X DELETE http://localhost:5000/customer/auth/review/1 \
  -b cookies.txt
```
**Output:**
```json
{
  "message": "Review by 'aishwarya' deleted successfully!",
  "reviews": {}
}
```

---

### Task 11 — general.js (Async/Await with Axios)

The `router/general.js` file implements retrieval of all books and their details by author, title, and ISBN using **async/await with Axios**:

```bash
# Async - Get all books
curl -X GET http://localhost:5000/async/books

# Async - Get by ISBN
curl -X GET http://localhost:5000/async/isbn/1

# Async - Get by author
curl -X GET http://localhost:5000/async/author/Austen

# Async - Get by title
curl -X GET http://localhost:5000/async/title/Pride
```

---

## Tech Stack

- **Node.js** + **Express.js**
- **JWT** (jsonwebtoken) for authentication
- **express-session** for session management
- **Axios** for async HTTP requests
