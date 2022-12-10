const express = require("express");
const router = express.Router();

// import controllers
const { posting, getPosts, getOnePost } = require("../controllers/post");

// api routes
router.post("/upload", posting);
router.get("/getPosts", getPosts);
router.get("/getOnePost/:username", getOnePost);

module.exports = router;
