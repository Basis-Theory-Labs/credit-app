import { BasisTheory } from "@basis-theory/basis-theory-js";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

let btClient;
const getBasisTheoryClient = () => {
    if (!btClient) {
        btClient = new BasisTheory().init(process.env.BASIS_THEORY_SERVER_APPLICATION)
    }
    
    return btClient;
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(404).json({message: 'Endpoint not found'});

        return;
    }

    const bt = await getBasisTheoryClient();
    const {bankToken, userToken} = req.body;

    const customer = await stripe.customers.create({
        description: 'Bank Customer',
    });

    try {
        const reactorResponse = await bt.reactors
            .react(process.env.STRIPE_REACTOR_ID, {
                args: {
                    source_country: 'US',
                    source_currency: 'usd',
                    customer_id: customer.id,
                    customer_name: `{{${userToken} | $.first_name}} {{${userToken} | $.last_name}}`,
                    bank: `{{${bankToken}}}`,
                },
            });

        const bankAccount = await stripe.customers.verifySource(
            customer.id,
            reactorResponse.raw.id,
            {
                amounts: [32, 45]
            }
        );

        res.status(200).json(bankAccount);
    } catch (err) {
        console.log(JSON.stringify(err));
    }
}