/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(404).json({message: 'Endpoint not found'});

        return;
    }

    const { userToken, ssnToken } = req.body;

    try {
      const { data } = await axios
        .post(
            "https://api.basistheory.com/proxy",
            {
                name_first: `{{ ${userToken} | json: '$.first_name' }}`,
                name_last: `{{ ${userToken} | json: '$.last_name' }}`,
                email_address: `{{ ${userToken} | json: '$.email' }}`,
                phone_number: `{{ ${userToken} | json: '$.phone' }}`,
                document_ssn: `{{ ${ssnToken} }}`,
                address_line_1: `{{ ${userToken} | json: '$.address.street' }}`,
                address_city: `{{ ${userToken} | json: '$.address.city' }}`,
                address_state: `{{ ${userToken} | json: '$.address.state' }}`,
                address_postal_code: `{{ ${userToken} | json: '$.address.postal_code' }}`,
            },
            {
                headers: {
                    "BT-PROXY-URL": 'https://sandbox.alloy.co/v1/evaluations',
                    "BT-API-KEY": process.env.BASIS_THEORY_SERVER_APPLICATION,
                    "alloy-sandbox": 'true',
                    "Content-Type": 'application/json',
                    Authorization: `Basic ${process.env.ALLOY_API_KEY}`,
                },
            }
        )

        res.status(200).json(data.summary);
    } catch (err) {
        console.error(err);
    }
}
