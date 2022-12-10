const express = require("express");
const router = express.Router();

// import controllers
const {
  uploadEvent,
  getEvents,
  getOneEvent,
  getOneEventLoc,
  getOneEventTp,
} = require("../controllers/event");

// api routes
router.post("/uploadEvent", uploadEvent);
router.get("/getEvents", getEvents);
router.get("/getOneEvent/:username", getOneEvent);
router.get("/getOneEvent/:location", getOneEventLoc);
router.get("/getOneEvent/:type", getOneEventTp);

module.exports = router;
