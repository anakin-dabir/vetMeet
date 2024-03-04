const catchAsync = require("../utils/catchAysnc");
const AppError = require("../utils/appError");
const factory = require("./FactoryHandler");
const multer = require("multer");
const sharp = require("sharp");
const Post = require("../models/postModel");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  console.log("=>>>", file);
  if (file.mimetype.startsWith("image")) {
    req.file = file;
    cb(null, true);
  } else {
    cb(new AppError("Only image file can be uploaded", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPostPhoto = upload.single("images");

exports.resizePostPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/posts/${req.file.filename}`);

  next();
};

exports.createPost = catchAsync(async (req, res, next) => {
  console.log("hi");
  const obj = {
    description: req.body.description,
    veteran: req.user._id,
    file: req.file.filename,
  };
  const data = await Post.create(obj);

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getPostsOfFollowedPersons = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data,
  });
});
