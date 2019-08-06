const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Learn Page
router.get('/learn', ensureAuthenticated, (req, res) =>
  res.render('learn', { user: req.user })
);
// Practice Page
router.get('/practice', ensureAuthenticated, (req, res) =>
  res.render('practice', { user: req.user })
);
// Enjoy Page
router.get('/enjoy', ensureAuthenticated, (req, res) =>
  res.render('enjoy', { user: req.user })
);
// About Page
router.get('/about', ensureAuthenticated, (req, res) =>
  res.render('about', { user: req.user })
);
// More Page
router.get('/more', ensureAuthenticated, (req, res) =>
  res.render('more', { user: req.user })
);

// Index after login
router.get('/welcomeUser', ensureAuthenticated, (req, res) =>
  res.render('welcomeUser', {
    user: req.user
  })
);

module.exports = router;
