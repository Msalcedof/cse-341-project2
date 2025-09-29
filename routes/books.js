const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * /book:
 *   get:
 *     summary: Retrieve all books
 *     responses:
 *       200:
 *         description: A list of books
 *
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *               pages:
 *                 type: integer
 *               rating:
 *                 type: number
 *               summary:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created
 */

/**
 * @swagger
 * /book/{id}:
 *   put:
 *     summary: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *               pages:
 *                 type: integer
 *               rating:
 *                 type: number
 *               summary:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Book not found
 *
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */

router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
