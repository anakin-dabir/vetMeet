const mongoose = require("mongoose");
const validator = require("validator");

const InvitationSchema = new mongoose.Schema(
  {
    eventID: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },

    veteranID: {
      type: mongoose.Schema.ObjectId,
      ref: "Veteran",
    },
    sendingTime: {
      type: Date,
      default: Date.now(),
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

InvitationSchema.pre("save", async function (next) {
  next();
});

InvitationSchema.pre(/^find/, async function (next) {
  this.populate({ path: "eventID" });

  next();
});

InvitationSchema.pre("aggregate", async function (next) {
  next();
});

InvitationSchema.methods.checkName = async function () {
  return "";
};

InvitationSchema.statics.deleteById = function (_id) {
  return this.deleteOne({ _id: _id });
};

const Invitation = mongoose.model("Invitation", InvitationSchema);

module.exports = Invitation;
