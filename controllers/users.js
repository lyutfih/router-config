const pool = require('../db/index');

const getUserById = (req, res) => {
  res.json(req.user);
};

const createUser = async (req, res) => {
  const { name, lastname, email } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (name, last_name, email) VALUES ($1, $2, $3) RETURNING *',
      [name, lastname, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateUser = async (req,res) => {
  const { name, lastname, email } = req.body;

  try {
    const result = await pool.query('UPDATE users SET name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *', [name, lastname, email, req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
    res.status(200).json({ deletedUser: result.rows[0]});
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser
};