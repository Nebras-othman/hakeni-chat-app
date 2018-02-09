const express = require('express');
const Router = express.Router;
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser());

app.listen(3000, () => {
	console.log('server is listening on port 3000');
});

