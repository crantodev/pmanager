const mongoose = require("mongoose");
const logger = require("../logger");

// Open mongo connection
mongoose.connect('mongodb://db:27017/pmanager', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  logger.info("DB Connected");
}).catch(error => {
  logger.error("DB could not be connected", error);
});

module.exports = mongoose;