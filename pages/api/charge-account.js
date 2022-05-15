const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { bankAccountId, customerId } = req.body;

  const charge = await stripe.charges.create({
    amount: 10000,
    currency: 'usd',
    source: bankAccountId,
    customer: customerId,
    description: 'Insurance Policy',
  });

  res.status(200).json(charge);
}
