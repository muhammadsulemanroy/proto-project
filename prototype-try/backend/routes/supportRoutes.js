const express = require("express");
const authController = require("../controllers/authController");
const supportController =  require("../controllers/supportController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.route("/").get(supportController.getAllWorkers)
router.route("/:id").patch(supportController.updateStatus).post(supportController.mail)

module.exports = router;
