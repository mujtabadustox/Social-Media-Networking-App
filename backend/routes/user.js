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
  addEvents,
  addInvite,
  removeFriends,
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
router.get("/removeFriends/:username/:friendusername", removeFriends);

router.get("/addInvite/:friendusername/:eventname", addInvite);

router.get("/addEvents/:username/:eventname", addEvents);

module.exports = router;
