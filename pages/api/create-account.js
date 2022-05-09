import { BasisTheory } from "@basis-theory/basis-theory-js";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const bt = await new BasisTheory().init(
    process.env.BASIS_THEORY_SERVER_APPLICATION
  );
  const { bankToken, userToken } = req.body;

  const customer = await stripe.customers.create({
    description: 'Bank Customer',
  });

  const reactorResponse = await bt.reactors
    .react(process.env.STRIPE_REACTOR_ID, {
      args: {
        source_country: 'US',
        source_currency: 'usd',
        customer_id: customer.id,
        customer_name: `{{${userToken} | $.first_name}} {{${userToken} | $.last_name}}`,
        bank: `{{${bankToken}}}`,
      },
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
    });

  const bankAccount = await stripe.customers.verifySource(
    customer.id,
    reactorResponse.raw.id,
    {
      amounts: [32, 45]
    }
  );

  return res.status(200).json(bankAccount);
}
