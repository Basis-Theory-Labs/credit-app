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
                name_first: `{{ ${userToken} | $.first_name }}`,
                name_last: `{{ ${userToken} | $.last_name }}`,
                email_address: `{{ ${userToken} | $.email }}`,
                phone_number: `{{ ${userToken} | $.phone }}`,
                document_ssn: `{{ ${ssnToken} }}`,
                address_line_1: `{{ ${userToken} | $.address.street }}`,
                address_city: `{{ ${userToken} | $.address.city }}`,
                address_state: `{{ ${userToken} | $.address.state }}`,
                address_postal_code: `{{ ${userToken} | $.address.postal_code }}`,
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
