const stripe = require("stripe")(process.env.SECRET_KEY);
const {v4: uuidv4} = require("uuid");

exports.makePayment = (req, res) => {
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
