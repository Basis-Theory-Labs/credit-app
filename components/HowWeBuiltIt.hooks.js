import {useRouter} from "next/router";
import {useBasisTheory} from "@basis-theory/basis-theory-react";
import {useState} from "react";
import axios from "axios";

export const useHowWeBuiltIt = () => {
    const router = useRouter();
    const { userToken, bankToken, ssnToken } = router.query;

    const { bt } = useBasisTheory(
        process.env.NEXT_PUBLIC_BASISTHEORY_ELEMENTS_APPLICATION,
        { elements: true }
    );

    const [expanded, setExpanded] = useState('form');
    const [verifyIdentityToken, setVerifyIdentityToken] = useState(null);
    const [createAccountToken, setCreateAccountToken] = useState(null);
    const [chargeAccountToken, setChargeAccountToken] = useState(null);


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const verifyIdentity = () => {
        axios
            .post("/api/verify-identity", { userToken, ssnToken })
            .then(({ data, ...rest }) => {
                setVerifyIdentityToken(data);
            });
    };

    const createAccount = () => {
        axios
            .post("/api/create-account", { bankToken, userToken })
            .then(({ data, ...rest }) => {
                setCreateAccountToken(data);
            });
    };

    const chargeAccount = () => {
        axios
            .post("/api/charge-account", {
                bankAccountId: createAccountToken.id,
                customerId: createAccountToken.customer,
            })
            .then(({ data, ...rest }) => {
                setChargeAccountToken(data);
            });
    };

    return {
        bt,
        handleChange,
        verifyIdentity,
        createAccount,
        chargeAccount,
        userToken,
        bankToken,
        ssnToken,
        expanded,
        verifyIdentityToken,
        chargeAccountToken,
        createAccountToken
    };
}