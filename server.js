require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bookRoutes = require('./routes/books');
const { swaggerUi, specs } = require('./swagger');
const authorsRoutes = require('./routes/authors');
const authRoutes = require('./routes/auth');

const session = require('express-session');
const passport = require('passport');
require('./middleware/passport');
const MongoStore = require('connect-mongo');

app.set('trust proxy', 1); // Required for secure cookies on Render

// Parse JSON before routes
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    dbName: 'cse-341-Project2',
    collectionName: 'sessions'
  }),
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 8
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/books', bookRoutes);
app.use('/authors', authorsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Book API! Visit /books or /api-docs to get started.');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'cse-341-Project2'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
