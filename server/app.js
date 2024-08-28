const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fitnessRouter = require("./routers/fitness_task_router");
const plansRouter = require("./routers/plans_router");
const app = express();
// const createRouter = require("./routers/create_router");
const accountRouter = require("./routers/account_router");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const passport = require("passport");
const calendarRouter = require("./routers/calendar_router");

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true, //
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const app = {
//   listen: () => {},
//   route: (path, middlewareFunction) => {},
// };
// app.listen();

app.use("/api", fitnessRouter); //    /api/
app.use("/plans", plansRouter);
// app.use("/create", createRouter);
app.use("/account", accountRouter);
app.use("calendar", calendarRouter);

module.exports = app;
