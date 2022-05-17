import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export const useCheckout = () => {
    const router = useRouter();
    const { userToken, bankToken, ssnToken } = router.query;

    const steps = ['Verify Identity', 'Connect Bank Account', 'Transfer Funds'];

    const [activeStep, setActiveStep] = useState(0);

    const verifyIdentity = async () => {
        const { data } = await axios
            .post("/api/verify-identity", { userToken, ssnToken });

        setActiveStep(1);

        return data;
    };

    const connectAccount = async () => {
        const { data } = await axios
            .post("/api/connect-account", { bankToken, userToken });

        setActiveStep(2);

        return data;
    };

    const chargeAccount = async (createdAccountToken) => {
        await axios
            .post("/api/charge-account", {
                bankAccountId: createdAccountToken.id,
                customerId: createdAccountToken.customer,
            });

        setActiveStep(3);
    };

    const checkout = async ({ userToken, bankToken, ssnToken }) => {
        await verifyIdentity(userToken, ssnToken);
        const createdAccount = await connectAccount(bankToken, userToken);
        await chargeAccount(createdAccount);
    };

    useEffect(() => {
        if (router.query.userToken) {
            checkout(router.query);
        }
    }, [router.query])

    const seeHowItWorks = async () => {
        await router.push(`/how-we-built-it?userToken=${userToken}&bankToken=${bankToken}&ssnToken=${ssnToken}`);
    }

    return {
        steps,
        activeStep,
        seeHowItWorks
    };
}
