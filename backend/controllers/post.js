const Post = require("../models/post");
require("dotenv").config();

exports.posting = async (req, res) => {
  const post = new Post(req.body);
  await post.save();

  res.status(201).json({
    message: "Succesfully Posted",
  });
};

// READ Students
exports.getPosts = (req, res) => {
  Post.find((error, data) => {
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

// READ Students
exports.getOnePost = (req, res) => {
  Post.find({ username: { $eq: req.params.username } }, (error, data) => {
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
