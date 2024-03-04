const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Community = require("../models/communityModel");
const catchAsync = require("../utils/catchAysnc");
const AppError = require("../utils/appError");
const Veteran = require("../models/veteranModel");

const createSignToken = id => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    }
  );
};

const createTokenSendResponse = (statusCode, user, res, req) => {
  const token = createSignToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV.trim() === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUpCommunity = catchAsync(async (req, res, next) => {
  const newUser = await Community.create({
    name: req.body.name,
    type: req.body.type,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    phone: req.body.phone,
  });

  createTokenSendResponse(201, newUser, res);
});

exports.logInCommunity = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return next(new AppError("Please provide email or password!", 400));
  }

  const user = await Community.findOne({
    email,
    active: true,
  }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  createTokenSendResponse(200, user, res, req);
});

exports.signUpVeteran = catchAsync(async (req, res, next) => {
  const newVeteran = await Veteran.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    profession: req.body.profession,
    phone: req.body.phone || "",
    hobbies: req.body.hobbies,
    gender: req.body.gender,
    address: req.body.address,
  });

  createTokenSendResponse(201, newVeteran, res);
});

exports.logInVeteran = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return next(new AppError("Please provide email or password!", 400));
  }

  const user = await Veteran.findOne({
    email,
    active: true,
  }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  createTokenSendResponse(200, user, res, req);
});

exports.logout = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };

  res.cookie("jwt", "logout", cookieOptions);
  res.status(200).json({ message: "Logged out" });
});

exports.protect = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log("TOKEN ", token);
  if (!token) {
    return next(
      new AppError("You are not logged in, please log in first! or email is incorrect", 401)
    );
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentCommunity = await Community.findById(decode.id);
  const currentVeteran = await Veteran.findById(decode.id);
  if (!currentCommunity && !currentVeteran) {
    return next(
      new AppError(
        "The user belong to this token does no longer exist!, You need to sign up or log in again",
        401
      )
    );
  }

  if (currentCommunity) req.user = currentCommunity;
  else req.user = currentVeteran;

  next();
});

exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      const currentUser = await User.findById(decode.id);
      if (!currentUser) {
        return next();
      }
      if (currentUser.changePasswordAfter(decode.iat)) {
        return next();
      }
      res.locals.user = currentUser;
      return next();
    }
    next();
  } catch (error) {
    next();
  }
};

exports.restrictTo = function (...roles) {
  return (req, res, next) => {
    console.log("=>>>> ", req.user);
    console.log("=>>>> ", roles);
    console.log("=>>>> ", roles.includes(req.user.role));
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not allowed to perform this action", 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return next(new AppError(`No user found with email: ${email}`, 404));
  }
  const resetToken = user.createResetToken();

  await user.save({
    validateBeforeSave: false,
  });
  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH requets with your new password and passwordConfirm to :\n 
    ${resetURL}\nIf you didn't forgot your password, please ignore this email! 😊`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset Token (valid only for 10 minutes)",
      message,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({
      validateBeforeSave: false,
    });
    next(
      new AppError("There is an error occur in sending the email!, Please try again later", 500)
    );
  }

  res.status(200).json({
    message: "Password reset token send to your email",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token: resetToken } = req.params;

  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired!", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();

  createTokenSendResponse(200, user, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { existingPassword } = req.body;
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.correctPassword(existingPassword, user.password))) {
    return next(new AppError("You have entered the wrong existing password!", 401));
  }
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();
  createTokenSendResponse(200, user, res);
});
