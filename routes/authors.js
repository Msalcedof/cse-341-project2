const express = require('express');
const router = express.Router();
const Author = require('../models/author');

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of authors
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
});

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const { name, birthYear, nationality } = req.body;
    if (!name || !birthYear) {
      return res.status(400).json({ error: 'Name and birth year are required' });
    }
    const author = new Author({ name, birthYear, nationality });
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create author' });
  }
});

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
  try {
    const { name, birthYear, nationality } = req.body;
    if (!name || !birthYear) {
      return res.status(400).json({ error: 'Name and birth year are required' });
    }
    const updated = await Author.findByIdAndUpdate(req.params.id, { name, birthYear, nationality }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Author not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update author' });
  }
});

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Author.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Author not found' });
    res.status(200).json({ message: 'Author deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete author' });
  }
});

module.exports = router;
