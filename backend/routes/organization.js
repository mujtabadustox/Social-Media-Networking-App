const express = require("express");
const router = express.Router();

// import controllers
const {
  registerOrg,
  loginOrg,
  logoutOrg,
  getLoggedInOrg,
  getOrg,
  getOneOrg,
  addFollowing,
  followEvents,
  sendInvite,
} = require("../controllers/organization");

// import middlewares
const {
  orgRegisterValidator,
  orgById,
} = require("../middlewares/organization");
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/registerOrg", orgRegisterValidator, registerOrg);
router.post("/loginOrg", loginOrg);
router.get("/logoutOrg", logoutOrg);

router.get("/user", verifyToken, orgById, getLoggedInOrg);
router.get("/organization", getOrg);
router.get("/sendOrg/:username", getOneOrg);
router.get("/addFollowing/:username/:friendorganizationname", addFollowing);

router.get("/followEvents/:username/:eventname", followEvents);

router.get("/sendInvite/:friendorganizationname/:eventname", sendInvite);

module.exports = router;
