const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const requirelogin = require("../utility/requireLogin");
const requireCredits = require("../utility/reauireCredit");
const mongoose = require("mongoose");
const Survey = require("../models/Survey");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTeamplate/surveyTemplate");

module.exports = (app) => {
  app.get("/api/surveys", requirelogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(surveys);
  });
  app.post("/api/surveys/webhooks", (req, res) => {
    // console.log("before");
    // console.log(req.body);
    const p = new Path("/api/survey/:surveyId/:choice");

    const ans = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          console.log(match);
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();
    // console.log("after");
    // console.log(ans);
    res.send({});
  });
  app.get("/api/survey/:surveyId/:choice", (req, res) => {
    res.send({ hey: "thanks for your feedback" });
  });
  app.post("/api/surveys", requirelogin, requireCredits, async (req, res) => {
    // console.log(req.body);
    const { title, subject, body, recipents } = req.body;
    // console.log(recipents);
    const survey = await Survey.create({
      title,
      subject,
      body,
      _user: req.user.id,
      recipients: recipents.split(",").map((email) => ({ email })),
      dateSent: Date.now(),
    });
    // send mail
    let mailer;
    mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();

      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
