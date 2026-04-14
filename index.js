const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const { authenticated } = require('./router/auth_users.js');
const { general } = require('./router/general.js');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'fingerprint_customer',
  resave: true,
  saveUninitialized: true
}));

// Mount routes
app.use('/', general);           // Public routes (books, search)
app.use('/customer', authenticated); // Auth routes (register, login, reviews)

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

module.exports = app;
