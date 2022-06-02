import {useRouter} from "next/router";
import {useBasisTheory} from "@basis-theory/basis-theory-react";

export const useHome = () => {
    const router = useRouter();
    const { bt } = useBasisTheory(
        process.env.NEXT_PUBLIC_BASISTHEORY_ELEMENTS_APPLICATION,
        { elements: true }
    );

    const submit = async () => {
        const tokens = await bt.tokenize({
            user: {
                type: 'token',
                data: {
                    first_name: bt.getElement("first_name"),
                    last_name: bt.getElement("last_name"),
                    email: bt.getElement("email"),
                    phone: bt.getElement("phone"),
                    address: {
                        street: bt.getElement("street"),
                        city: bt.getElement("city"),
                        state: bt.getElement("state"),
                        postal_code: bt.getElement("postal_code"),
                    },
                },
                privacy: {
                    classification: 'pii',
                    impact_level: 'moderate',
                },
                fingerprint_expression: '{{ data.first_name | downcase }} {{ data.last_name}}',
                search_indexes: [
                    '{{ data.first_name }} {{ data.last_name}}',
                    '{{ data.email | downcase }}',
                    '{{ data.phone | last4 }}'
                ],
                metadata: {
                    user_id: "123456"
                }
            },
            ssn: {
                type: 'social_security_number',
                data: bt.getElement("ssn"),
                metadata: {
                    customer_type: "vip"
                }
            },
            bank: {
                type: 'bank',
                data: {
                    routing_number: bt.getElement("routing_number"),
                    account_number: bt.getElement("account_number"),
                },
            },
        });

        await router.push(`/checkout?userToken=${tokens.user.id}&bankToken=${tokens.bank.id}&ssnToken=${tokens.ssn.id}`);
    };

    return {
        bt,
        submit
    };
}
