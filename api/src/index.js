const express = require("express");
const logger = require('./logger');

// Create the express app
const app = express();

// Get expresse routes
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`API is up and running at ${PORT}`);
});