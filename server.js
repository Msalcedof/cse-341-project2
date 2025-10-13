require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bookRoutes = require('./routes/books');
const { swaggerUi, specs } = require('./swagger');
const authorsRoutes = require('./routes/authors');

const session = require('express-session');
const passport = require('passport');
require('./middleware/passport');

const authRoutes = require('./routes/auth');

const MongoStore = require('connect-mongo');

app.use('/auth', authRoutes);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    dbName: 'cse-341-Project2',
    collectionName: 'sessions'
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use('/books', bookRoutes);
app.use('/authors', authorsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Book API! Visit /book or /api-docs to get started.');
});


mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'cse-341-Project2'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
