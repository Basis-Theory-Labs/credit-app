import axios from "axios";

export default async function handler(req, res) {
    const { userToken, ssnToken } = req.body;

    return axios
    .post(
      "https://api.basistheory.com/proxy",
      {
        name_first: `{{${userToken} | $.first_name}}`,
        name_last: `{{${userToken} | $.last_name}}`,
        email_address: `{{${userToken} | $.email}}`,
        document_ssn: `{{${ssnToken}}}`,
        address_line_1: '111 Test St',
        address_city: 'San Francisco',
        address_state: 'CA',
        address_postal_code: '94941',
        phone_number: '555-123-4567'
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
    .then(async ({ data }) => {
      res.status(200).json(data.summary);
    });
}