const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`Hello World!
        <br>
        Some useful links:
        <ul>
        <li><a href="/users">All users</a></li>
        <li><a href="/users/2">Get the user with ID of 2</a></li>
        </ul>`);
});

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

  app.listen(PORT, () => {
    console.log(`Server works on: http://localhost:${PORT}`);
  });