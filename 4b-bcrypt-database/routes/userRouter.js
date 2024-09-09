const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  loginUser,
  updatePassword,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.put("/updatePassword", updatePassword);

module.exports = router;
