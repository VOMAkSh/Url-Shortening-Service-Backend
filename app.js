const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDb = require("./config/db");

// For connecting to DB
connectDb();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Adding routes here
app.use('/api/auth', require('./routes/auth/authRoutes'));
app.use('/api/url', require('./routes/urlShortener/urlShortenerRoutes'));
app.use('/', require('./routes/redirection/redirectionRoute'));

// PORT for SERVER
const PORT = 3002;

app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
