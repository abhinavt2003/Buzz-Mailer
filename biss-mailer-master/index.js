const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
require("./services/passport");
require("./models/User");
require("./models/Survey");

const passport = require("passport");
// const bodyParser = require("");

const cookiesession = require("cookie-session");
const app = express();
app.use(bodyParser.json());

app.use(
  cookiesession({
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: [keys.cookiekey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoute")(app);
require("./routes/surveyRoutes")(app);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

// for connecting to db and starting server
mongoose
  .connect(keys.dburi)
  .then(() => {
    console.log("hi im n ");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
