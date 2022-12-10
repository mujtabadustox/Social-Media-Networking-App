const Event = require("../models/event");
require("dotenv").config();

exports.uploadEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();

  res.status(201).json({
    message: "Succesfully Posted",
  });
};

exports.getEvents = (req, res) => {
  Event.find((error, data) => {
    if (error) {
      return res.status(401).json({
        error: "Retrieve Failed",
      });
    } else {
      return res.json({
        data,
      });
    }
  });
};

exports.getOneEvent = (req, res) => {
  Event.find({ username: { $eq: req.params.username } }, (error, data) => {
    if (error) {
      return res.status(401).json({
        error: "Retrieve Failed",
      });
    } else {
      return res.json({
        message: "Lmao",
        data,
      });
    }
  });
};

exports.getOneEventLoc = (req, res) => {
  Event.find({ location: { $eq: req.params.location } }, (error, data) => {
    if (error) {
      return res.status(401).json({
        error: "Retrieve Failed",
      });
    } else {
      return res.json({
        message: "Lmao",
        data,
      });
    }
  });
};

exports.getOneEventTp = (req, res) => {
  Event.find({ type: { $eq: req.params.type } }, (error, data) => {
    if (error) {
      return res.status(401).json({
        error: "Retrieve Failed",
      });
    } else {
      return res.json({
        message: "Lmao",
        data,
      });
    }
  });
};
