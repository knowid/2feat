const router = require("express").Router();
const sneakerController = require("../controllers/sneakerController");

router.get("/", sneakerController.getAll);
router.get("/:id", sneakerController.getOne);
router.post("/add", sneakerController.postSneaker);
router.put("/:id", sneakerController.updateSneaker);
router.delete("/:id", sneakerController.deleteSneaker);

module.exports = router;
