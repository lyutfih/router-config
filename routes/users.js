const express = require('express');
const router = express.Router();
const pool  = require('../db/index');
const { body, validationResult } = require('express-validator');
const checkUser = require('../middlewares/checkUser');
const {
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

router.use(express.json())

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', checkUser, getUserById);

router.post('/', [
  body('name').trim().notEmpty().withMessage('First name is required'),
  body('lastname').trim().notEmpty().withMessage('Last name is required'),
  body('email').trim().isEmail().withMessage('Email is not valid'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  await createUser(req, res);
});

router.put('/:id', [
  body('name').trim().notEmpty().withMessage('First name is required'),
  body('lastname').trim().notEmpty().withMessage('Last name is required'),
  body('email').trim().isEmail().withMessage('Email is not valid'),
], checkUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  await updateUser(req, res);
});

router.delete('/:id', checkUser, deleteUser);

module.exports = router;