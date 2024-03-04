const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const veteranSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Enter first name!"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Enter last name!"],
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    address: {
      type: String,
      required: [true, "Please enter your address"],
    },
    email: {
      type: String,
      unique: [true, "User with this email already exist"],
      required: [true, "Please provide your email"],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide valid email"],
    },
    phone: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [8, "Password must be of atleast 8 characters long"],
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password and Confirm-password are not same!",
      },
    },

    hobbies: [
      {
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
        required: [true, "Please add some hobbies!"],
      },
    ],

    profession: {
      type: String,
      required: [true, "Please enter your profession!"],
    },
    followed: [
      {
        type: mongoose.Schema.ObjectId,
      },
    ],
    stars: {
      type: Number,
      default: 1,
    },
    interestedEvents: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Event",
      },
    ],
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

veteranSchema.virtual("Posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "veteran",
});

veteranSchema.virtual("createdEvents", {
  ref: "Event",
  localField: "_id",
  foreignField: "veteranID",
});

veteranSchema.virtual("invitations", {
  ref: "Invitation",
  localField: "_id",
  foreignField: "veteranID",
});

veteranSchema.virtual("badge").get(function () {
  if (this.stars >= 25000) {
    return "Silver";
  } else if (this.stars >= 40000) {
    return "Ruby";
  } else if (this.stars >= 50000) {
    return "Golden";
  } else if (this.stars >= 60000) {
    return "Diamond";
  } else if (this.stars >= 65000) {
    return "Sapphire";
  } else if (this.stars >= 70000) {
    return "Platinum";
  } else if (this.stars >= 100000) {
    return "Eternal";
  }
});

veteranSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  console.log("hi from document", this);

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

veteranSchema.pre(/^find/, function (next) {
  this.populate({ path: "Posts" });
  next();
});
veteranSchema.pre(/^find/, function (next) {
  this.populate({ path: "invitations" });
  next();
});

veteranSchema.methods.correctPassword = async function (userPassword, encryptedPassword) {
  return await bcrypt.compare(userPassword, encryptedPassword);
};

const Veteran = mongoose.model("Veteran", veteranSchema);

module.exports = Veteran;
