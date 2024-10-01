const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  loginUser,
  updatePassword,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.put("/", updatePassword);

module.exports = router;
