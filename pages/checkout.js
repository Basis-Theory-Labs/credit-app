import Head from "next/head";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { userToken, bankToken, ssnToken } = router.query;

  const steps = ['Verify Identity', 'Create Bank Account', 'Transfer Funds'];

  const [activeStep, setActiveStep] = useState(0);
  const [verifyIdentityToken, setVerifyIdentityToken] = useState(null);
  const [createAccountToken, setCreateAccountToken] = useState(null);

  const verifyIdentity = useCallback(async () => {
    const { data } = await axios
      .post("/api/verify-identity", { userToken, ssnToken });

      setVerifyIdentityToken(data);
    setActiveStep(1);
  }, [ssnToken, userToken]);

  useEffect(() => {
    verifyIdentity()
    .catch(console.error);
  }, [verifyIdentity]);

  const createAccount = useCallback(async () => {
    const { data } = await axios
      .post("/api/create-account", { bankToken, userToken });

    setCreateAccountToken(data);
    setActiveStep(2);
  }, [verifyIdentityToken]);

  useEffect(() => {
    createAccount()
    .catch(console.error);
  }, [createAccount]);

  const chargeAccount = useCallback(async () => {
    await axios
      .post("/api/charge-account", { 
        bankAccountId: createAccountToken.id, 
        customerId: createAccountToken.customer, 
      });

    setActiveStep(3);
  }, [createAccountToken]);

  useEffect(() => {
    chargeAccount()
    .catch(console.error);
  }, [chargeAccount]);

  const seeHowItWorks = async () => {
    router.push(`/how-we-built-it?userToken=${userToken}&bankToken=${bankToken}&ssnToken=${ssnToken}`);
  }

  return (
    <Container maxWidth="md">
      <Head>
        <title>Checkout</title>
      </Head>

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 3 && (
          <>
            <Typography component="h3" variant="h5" align="center">
              🎉 Success!
            </Typography>

            <Typography component="h3" variant="h6" align="center" sx={{ mb: 6 }}>
              $1,000 will be deposited in 2-4 business days
            </Typography>

            <Button variant="outlined" onClick={seeHowItWorks}>See how it works</Button>
          </>
        )}
      </Paper>
    </Container>
  );
}