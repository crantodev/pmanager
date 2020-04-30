const router = require("express").Router();

const { listing, detail, create } = require("../handlers/users");
const { user } = require("../utils/validators");
const { auth } = require("../utils/middlewares");

router.get("/", auth, listing);
router.get("/:id", auth, detail);
router.post("/", [auth, user.create], create);

module.exports = router;
