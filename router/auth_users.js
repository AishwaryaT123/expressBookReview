const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('../books.js');

const regd_users = express.Router();
let users = [];

// Check if username is valid (not already taken)
const isValid = (username) => {
  return !users.some(u => u.username === username);
};

// Check if username and password match a registered user
const authenticatedUser = (username, password) => {
  return users.some(u => u.username === username && u.password === password);
};

// Task 7 — Register a new user
regd_users.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!isValid(username)) {
    return res.status(409).json({ message: "Username already exists. Please choose a different username." });
  }

  users.push({ username, password });
  return res.status(201).json({ message: `User '${username}' registered successfully!` });
});

// Task 8 — Login as a registered user
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const accessToken = jwt.sign(
    { username },
    'access',
    { expiresIn: '1h' }
  );

  req.session.authorization = { accessToken, username };

  return res.status(200).json({
    message: `User '${username}' logged in successfully!`,
    token: accessToken
  });
});

// Middleware to verify JWT for protected routes
const verifyToken = (req, res, next) => {
  if (req.session.authorization) {
    const token = req.session.authorization.accessToken;
    jwt.verify(token, 'access', (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid or expired. Please log in again." });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "User not logged in. Please log in first." });
  }
};

// Task 9 — Add or update a book review (authenticated)
regd_users.put('/auth/review/:isbn', verifyToken, (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.user.username;

  if (!review) {
    return res.status(400).json({ message: "Review text is required as a query parameter" });
  }

  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.reviews[username] = review;

  return res.status(200).json({
    message: `Review by '${username}' added/updated successfully!`,
    reviews: book.reviews
  });
});

// Task 10 — Delete a book review (authenticated)
regd_users.delete('/auth/review/:isbn', verifyToken, (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!book.reviews[username]) {
    return res.status(404).json({ message: "No review found for this user to delete" });
  }

  delete book.reviews[username];

  return res.status(200).json({
    message: `Review by '${username}' deleted successfully!`,
    reviews: book.reviews
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
