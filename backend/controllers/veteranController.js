const User = require("../models/veteranModel");
const catchAsync = require("../utils/catchAysnc");
const AppError = require("../utils/appError");
const factory = require("./FactoryHandler");
const Veteran = require("../models/veteranModel");

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

  const filteredObj = filterObject(req.body);

  const updatedUser = await Veteran.findByIdAndUpdate(req.user._id, filteredObj, {
    new: true,
  });

  res.status(201).json({
    status: "success",
    user: updatedUser,
  });
});

exports.getAllVeterans = catchAsync(async (req, res, next) => {
  let docs = await Veteran.find({ _id: { $ne: req.user._id } });

  res.status(200).json({
    status: "success",
    data: docs,
  });
});

exports.getVeteran = factory.getOne(User, "interestedEvents invitations createdEvents");

exports.getVeteranByID = catchAsync(async (req, res, next) => {
  const data = await Veteran.findById(req.params.id).populate("createdEvents");

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.increaseVeteranStars = catchAsync(async (req, res, next) => {
  const vetStars = (await Veteran.findById(req.user._id)).stars;
  const data = await Veteran.findByIdAndUpdate(
    req.user._id,
    { stars: vetStars + Number(req.body.stars) },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getVeteranFollowedPersons = catchAsync(async (req, res, next) => {
  const followedPeople = (await Veteran.findById(req.user._id).select("followed")).followed;

  let persons;

  console.log(followedPeople);

  persons = followedPeople.map(async el => {
    return await Veteran.findById(el);
  });

  const data = await Promise.all(persons);

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.FollowPerson = catchAsync(async (req, res, next) => {
  let followedPeople = (await Veteran.findById(req.user._id).select("followed")).followed;
  if (followedPeople.indexOf(req.params.id) == -1) followedPeople.push(req.params.id);
  console.log(followedPeople);
  const data = await Veteran.findByIdAndUpdate(
    req.user._id,
    { followed: followedPeople },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.FollowOrganization = catchAsync(async (req, res, next) => {
  let followedOrganization = (await Veteran.findById(req.user._id).select("followed")).followed;
  if (followedPeople.indexOf(req.params.id) == -1) followedPeople.push(req.params.id);
  console.log(followedPeople);
  const data = await Veteran.findByIdAndUpdate(
    req.user._id,
    { followed: followedPeople },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.interestedInEvent = catchAsync(async (req, res, next) => {
  let newInterestedEvents = (await Veteran.findById(req.user._id).select("interestedEvents"))
    ?.interestedEvents;
  if (!newInterestedEvents) return next(new AppError("Error occured", 400));
  newInterestedEvents.push(req.params.id);
  console.log(newInterestedEvents);
  await Veteran.findByIdAndUpdate(req.user._id, { interestedEvents: newInterestedEvents });
  res.status(200).json({
    status: "success",
  });
});

exports.vetrensWithMatchingHobbies = catchAsync(async (req, res, next) => {
  const doc = await Veteran.find();
  const hobby = req.params.hobby;

  const filtered = doc.filter(e => {
    return e.hobbies.indexOf(hobby) != -1;
  });

  res.status(200).json({
    status: "success",
    results: filtered.length,
    data: {
      data: filtered,
    },
  });
});

function shuffle1(arr) {
  return Array(arr.length)
    .fill(null)
    .map((_, i) => [Math.random(), i])
    .sort(([a], [b]) => a - b)
    .map(([, i]) => arr[i]);
}

exports.getPostOfVeteranFollowed = catchAsync(async (req, res, next) => {
  const followedPeople = (await Veteran.findById(req.user._id).select("followed")).followed;
  let renderPosts = [];
  for (const el of followedPeople) {
    let { firstName, lastName, Posts } = await Veteran.findById(el).select(
      "Posts firstName lastName"
    );
    Posts.forEach(ell => {
      renderPosts.push({ firstName: firstName, lastName: lastName, post: ell });
    });
  }
  res.status(200).json({
    status: "success",
    data: renderPosts,
  });
});
