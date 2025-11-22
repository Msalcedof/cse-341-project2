const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://project2-3gge.onrender.com/auth/google/callback'

}, (accessToken, refreshToken, profile, done) => {
  try {
    // Debug: log the full profile to Render logs
    console.log('Google profile:', JSON.stringify(profile, null, 2));

    // Safely extract user info
    const user = {
      id: profile.id,
      email: Array.isArray(profile.emails) ? profile.emails[0].value : 'no-email',
      name: profile.displayName || 'no-name'
    };

    return done(null, user);
  } catch (err) {
    console.error('Error in Google Strategy:', err);
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
