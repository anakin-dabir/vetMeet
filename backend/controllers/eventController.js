const Event = require("../models/eventModel");
const catchAsync = require("../utils/catchAysnc");
const AppError = require("../utils/appError");
const factory = require("./FactoryHandler");
const Veteran = require("../models/veteranModel");

exports.createEvent = catchAsync(async (req, res, next) => {
  if (req.body.communityID && req.body.veteranID)
    return next(new AppError("You are not allowed to perform this action", 403));

  req.body.eventStars = Number(req.body.eventStars);

  const doc = await Event.create(req.body);
  console.log(doc);
  res.status(201).json({
    status: "success",
    data: doc,
  });

  res.status(200).json({
    status: "success",
    data: "Hello World!",
  });
});

exports.getAllEvents = factory.getAll(Event);

exports.getSingleEvent = factory.getOne(Event);

exports.updateEvent = factory.updateOne(Event);

exports.deleteEvent = factory.deleteOne(Event);

exports.getMatchingEvents = catchAsync(async (req, res, next) => {
  const hobbies = (await Veteran.findById(req.params.id)).hobbies;
  const allEvents = await Event.find();
  const suggestedEvents = allEvents.filter(e => hobbies.indexOf(e.hobby) != -1);

  res.status(200).json({
    status: "success",
    data: suggestedEvents,
  });
});
