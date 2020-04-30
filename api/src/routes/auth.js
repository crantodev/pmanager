const router = require("express").Router();

const { login, register } = require("../handlers/auth");
const { auth } = require("../utils/validators");

router.post("/login", auth.login, login);
router.post("/register", auth.register, register);

module.exports = router;
