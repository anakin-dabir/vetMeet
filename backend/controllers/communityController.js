const Community = require("../models/communityModel");
const catchAsync = require("../utils/catchAysnc");
const AppError = require("../utils/appError");
const factory = require("./FactoryHandler");

const filterObject = (obj, ...fields) => {
  let newObj = {};

  Object.keys(obj).forEach(el => {
    if (fields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("This URL is not for password updates. Please go to /updateMyPassword", 400)
    );
  }

  const filteredObj = filterObject(req.body, "name", "email", "events");

  const updatedCommunity = await Community.findByIdAndUpdate(req.Community._id, filteredObj, {
    new: true,
  });

  res.status(201).json({
    status: "success",
    Community: updatedCommunity,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await Community.findByIdAndUpdate(req.Community._id, {
    active: false,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllCommunities = catchAsync(async (req, res, next) => {
  let docs = await Community.find().populate({ path: "createdEvents" });

  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      data: docs,
    },
  });
});

exports.getCommunity = factory.getOne(Community, "createdEvents");

exports.deleteCommunity = factory.deleteOne(Community);
