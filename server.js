const express = require('express');

const app = express();

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/watchlist', require('./routes/watchlist'));

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
