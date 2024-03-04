const mongoose = require("mongoose");
const validator = require("validator");

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of the event!"],
      trim: true,
    },
    eventTime: {
      type: Date,
      required: [true, "Please enter the event time!"],
    },
    eventLink: String,
    eventType: {
      type: String,
      required: [true, "Please enter the event type!"],
    },
    eventStars: {
      type: Number,
      required: [true, "Please enter the number of stars for the event!"],
      max: 5000,
    },
    hobby: {
      type: String,
      enum: [
        "reading",
        "traveling",
        "fishing",
        "crafting",
        "television",
        "bird watching",
        "collecting",
        "music",
        "gardening",
        "video games",
      ],
      required: [true, "Please select a hobby!"],
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    communityID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
    veteranID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veteran",
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

EventSchema.pre("save", async function (next) {
  next();
});

EventSchema.pre(/^find/, async function (next) {
  next();
});

EventSchema.pre("aggregate", async function (next) {
  next();
});

EventSchema.methods.checkName = async function () {
  return "";
};

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
