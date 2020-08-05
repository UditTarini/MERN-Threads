const stripe = require("stripe")(process.env.ST_SECRET_KEY);
const braintree = require("braintree");
const {v4: uuidv4} = require("uuid");

// For stripe
exports.stripePayment = (req, res) => {
  const {token, totCost} = req.body;

  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: totCost * 100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            description: "wonderfull threads",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          {idempotencyKey}
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err));
    });
};

// For braintree
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_ID,
  privateKey: process.env.BT_PRIVATE_KEY,
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.braintreePayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amount = req.body.amount;

  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};
