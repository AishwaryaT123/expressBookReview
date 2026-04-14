const express = require('express');
const axios = require('axios');
let books = require('../books.js');

const public_users = express.Router();

// Task 2 — Get all books (callback style)
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Task 3 — Get book by ISBN (callback style)
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book);
  }
  return res.status(404).json({ message: "Book not found" });
});

// Task 4 — Get books by author (callback style)
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author.toLowerCase();
  const result = Object.values(books).filter(
    b => b.author.toLowerCase().includes(author)
  );
  if (result.length > 0) {
    return res.status(200).json(result);
  }
  return res.status(404).json({ message: "No books found for this author" });
});

// Task 5 — Get books by title (callback style)
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();
  const result = Object.values(books).filter(
    b => b.title.toLowerCase().includes(title)
  );
  if (result.length > 0) {
    return res.status(200).json(result);
  }
  return res.status(404).json({ message: "No books found with this title" });
});

// Task 6 — Get book review by ISBN
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book.reviews);
  }
  return res.status(404).json({ message: "Book not found" });
});

// ── TASK 11: Async/Await with Axios versions ──

// Get all books using async/await with Axios
public_users.get('/async/books', async (req, res) => {
  try {
    const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;
    const response = await axios.get(`${BASE_URL}/`);
    return res.status(200).json(response.data);
  } catch (error) {
    // Fallback: return directly from local data
    return res.status(200).json(books);
  }
});

// Get book by ISBN using async/await with Axios
public_users.get('/async/isbn/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get books by author using async/await with Axios
public_users.get('/async/author/:author', async (req, res) => {
  try {
    const author = req.params.author;
    const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "No books found for this author" });
  }
});

// Get books by title using async/await with Axios
public_users.get('/async/title/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "No books found with this title" });
  }
});

module.exports.general = public_users;
