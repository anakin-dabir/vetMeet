const express = require("express");
const { protect } = require("../controllers/authController");
const { uploadPostPhoto, resizePostPhoto, createPost } = require("../controllers/postController");

const Router = express.Router();

Router.post("/", protect, uploadPostPhoto, resizePostPhoto, createPost);

module.exports = Router;
