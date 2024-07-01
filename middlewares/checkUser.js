const pool = require('../db/index');


const checkUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = rows[0];
    next();
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = checkUser;