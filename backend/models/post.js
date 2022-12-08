const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    postContent: {
      photoSrc: String,
      videoSrc: String,
      datePosted: { type: Date, default: Date.now },
      reactions: Number,
      description: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
