const keys = require("../config/keys");
const requirelogin = require("../utility/requireLogin");
// const stripe = require("stripe")(keys.stripesk);
const stripe = require("stripe")(keys.stripeSk);
module.exports = (app) => {
  app.post("/api/stripe", requirelogin, async (req, res) => {
    console.log("hi");
    try {
      const charge = await stripe.charges.create({
        amount: 2000,
        currency: "inr",
        source: "tok_visa",
        source: req.body.id,
        description:
          "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)",
      });
      //   console.log(charge);
    } catch (err) {
      console.log(err);
    }
    req.user.credits += 5;
    const user = await req.user.save();
    console.log(user);
    res.send(user);
  });
};
