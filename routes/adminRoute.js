const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.post('/loginAdmin', adminController.login);
router.post('/updateCategory', adminController.updateCategory);
router.get("/getCategory", adminController.getCategory);
router.post('/register', adminController.register);

module.exports = router;