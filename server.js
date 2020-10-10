const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3005;

const endpoints = require('./endpoints');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', endpoints);

app.listen(port, () => console.log(`Listening at the port ${port}`));
