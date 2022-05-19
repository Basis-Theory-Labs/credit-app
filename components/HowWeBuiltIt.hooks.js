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
    const [connectAccountToken, setConnectAccountToken] = useState(null);
    const [transferFundsToken, setTransferFundsToken] = useState(null);


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

    const connectAccount = () => {
        axios
            .post("/api/connect-account", { bankToken, userToken })
            .then(({ data, ...rest }) => {
                setConnectAccountToken(data);
            });
    };

    const transferFunds = () => {
        axios
            .post("/api/charge-account", {
                bankAccountId: connectAccountToken.id,
                customerId: connectAccountToken.customer,
            })
            .then(({ data, ...rest }) => {
                setTransferFundsToken(data);
            });
    };

    return {
        bt,
        handleChange,
        verifyIdentity,
        connectAccount,
        transferFunds,
        userToken,
        bankToken,
        ssnToken,
        expanded,
        verifyIdentityToken,
        transferFundsToken,
        connectAccountToken
    };
}