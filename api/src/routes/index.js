const router = require("express").Router();

const {index} = require('../handlers/welcome');

router.get('/', index);

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/projects", require("./projects"));

router.use((req, res) => {
  return res.json({errors: "Not Found."})
})

module.exports = router;