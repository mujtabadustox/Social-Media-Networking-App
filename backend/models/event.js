const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    eventname: String,
    organizationname: String,
    photoSrc: String,
    datePosted: { type: Date, default: Date.now },
    dateStart: Date,
    dateEnd: Date,
    description: String,
    members: Number,
    invited: Array,
    going: Array,
    stars: Number,
    type: String,
    location: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
