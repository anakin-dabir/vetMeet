const mongoose = require("mongoose");
const validator = require("validator");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    file: {
      type: String,
    },

    veteran: {
      type: mongoose.Schema.ObjectId,
      ref: "Veteran",
      required: [true, "You are not logged in!!!!!"],
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

postSchema.pre("save", async function (next) {
  next();
});

postSchema.pre(/^find/, async function (next) {
  next();
});

postSchema.pre("aggregate", async function (next) {
  next();
});

postSchema.methods.checkName = async function () {
  return "";
};

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
