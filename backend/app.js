const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const communityRouter = require("./routes/communityRouter");
const evetnRouter = require("./routes/eventRouter");
const veteranRouter = require("./routes/veteranRouter");
const postRouter = require("./routes/postRouter");
const invitationRouter = require("./routes/invitationRouter");

const app = express();
app.use(cors());

app.use(helmet());

if (process.env.NODE_ENV.trim() === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});

app.use(express.json({ limit: "10kb" }));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(mongoSanitize());

app.use(xss());

app.use("/api/community", communityRouter);
app.use("/api/events", evetnRouter);
app.use("/api/veterans", veteranRouter);
app.use("/api/posts", postRouter);
app.use("/api/invitations", invitationRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} , on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
