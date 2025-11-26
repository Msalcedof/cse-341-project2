const router = require('express').Router();
const passport = require('passport');

// Start Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handle callback after Google login
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failed' }),
  (req, res) => res.redirect('/api-docs')
);

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // explicitly clear session cookie
      res.redirect('/');
    });
  });
});

// Login status route
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      loggedIn: true,
      user: req.user
    });
  } else {
    res.json({ loggedIn: false });
  }
});

// Friendly login-failed route
router.get('/login-failed', (req, res) => {
  res.status(401).send('Login failed. Please try again.');
});

module.exports = router;``
