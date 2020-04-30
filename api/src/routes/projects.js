const router = require("express").Router();

const { listing, detail, create, remove } = require("../handlers/projects");
const { project } = require("../utils/validators");
const { auth, loadProject } = require("../utils/middlewares");

router.get("/", auth, listing);
router.get("/:id", auth, detail);
router.post("/", [auth, project.create], create);
router.delete("/:id", auth, remove);

router.use("/:projectId/tasks", loadProject, require("./tasks"));

module.exports = router;
