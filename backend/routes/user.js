const express = require("express");
const router = express.Router();

// import controllers
const {
  register,
  login,
  logout,
  getLoggedInUser,
  sendUsers,
  sendOneUser,
  addFriends,
} = require("../controllers/user");

// import middlewares
const { userRegisterValidator, userById } = require("../middlewares/user");
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/register", userRegisterValidator, register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/user", verifyToken, userById, getLoggedInUser);
router.get("/send", sendUsers);
router.get("/sendUser/:username", sendOneUser);
router.get("/addFriends/:username/:friendusername", addFriends);

module.exports = router;
