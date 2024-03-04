const express = require("express");

const {
  getAllCommunities,
  getCommunity,
  deleteCommunity,
  updateMe,
  deleteMe,
} = require(`./../controllers/communityController`);

const {
  signUpCommunity,
  logInCommunity,
  protect,
  restrictTo,
} = require("../controllers/authController");

const communityRouter = express.Router();

communityRouter.post("/signup", signUpCommunity);
communityRouter.post("/login", logInCommunity);
communityRouter.use(protect);
communityRouter.get("/me", getCommunity);
communityRouter.route("/:id").get(getCommunity);
communityRouter.route("/").get(getAllCommunities);
communityRouter.route("/:id").delete(deleteCommunity);
module.exports = communityRouter;
