/* eslint-disable import/no-anonymous-default-export */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).json({message: 'Endpoint not found'});

    return;
  }

  const { bankAccountId, customerId } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: 10000,
      currency: 'usd',
      source: bankAccountId,
      customer: customerId,
      description: 'Insurance Policy',
    });

    res.status(200).json(charge);
  } catch (err) {
    console.error(err);
  }
}
