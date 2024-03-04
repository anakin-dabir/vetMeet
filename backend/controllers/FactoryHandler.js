const catchAsync = require("../utils/catchAysnc");
const AppError = require("../utils/appError");

const APIFeatures = require(`${__dirname}/../utils/apiFeatures`);

exports.deleteOne = Model => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`Couldn't found document with ID: ${req.params.id}`, 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};

exports.updateOne = Model => {
  return catchAsync(async (req, res, next) => {
    console.log("param id: ", req.params.id);
    console.log(req.body);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(doc);

    if (!doc) {
      return next(new AppError(`Could not found document with ID: ${req.params.id}`, 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

exports.createOne = (Model, options) => {
  return catchAsync(async (req, res, next) => {
    console.log("-------> ", req.body);
    const doc = await Model.create(req.body);
    console.log(doc);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });
};

exports.getOne = (Model, populateOptions) => {
  return catchAsync(async (req, res, next) => {
    req.params.id = req.params.id || req.user._id;

    let query = Model.findById(req.params.id);

    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError(`Could not found document with ID: ${req.params.id}`, 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
};

exports.getAll = (Model, populateOptions, options) => {
  return catchAsync(async (req, res, next) => {
    let filterObj = {};

    const features = new APIFeatures(Model.find(filterObj), req.query);

    features.filter().sort().limitFields().paginate();

    let query = features.query;
    let docs;
    if (options) {
      query = query.find(options);
    }

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    docs = await query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });
};
