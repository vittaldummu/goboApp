const router = require("express").Router();
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userController");
const { verifyUser, verifyAdmin } = require("../middleware/verifyToken");

router.post("/", adminController.signUp);

router.post("/login", adminController.logIn);

router.get('/getAllUser',adminController.getAllUser);

router.patch('/:userId', adminController.updateAdmin);

router.delete('/:deleteAdmin', adminController.deleteAdmin); //delete admin

router.get('/getUser', adminController.getUser); //delete user

//router.get("/data", verifyAdmin, adminController.data)

module.exports = router;
