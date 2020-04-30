const router = require("express").Router();

const { listing, detail, create } = require("../handlers/tasks");
const { task } = require("../utils/validators");
const { auth } = require("../utils/middlewares");

router.get("/", auth, listing);
router.get("/:id", auth, detail);
router.post("/", [auth, task.create], create);

module.exports = router;
