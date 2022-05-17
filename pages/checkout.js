import Head from "next/head";
import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box
} from "@mui/material";
import {useCheckout} from '@/components/Checkout.hooks';

export default function Checkout() {
  const {steps, activeStep, seeHowItWorks} = useCheckout();

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
            <Typography component="h3" variant="h5" align="center" sx={{ mt: 4 }}>
              🎉 Success!
            </Typography>

            <Typography component="h3" variant="h6" align="center" sx={{ mb: 6 }}>
              $1,000 will be deposited in 2-4 business days
            </Typography>

            <Box sx={{ 'text-align': 'center' }}>
              <Button size="large" variant="outlined" onClick={seeHowItWorks}>See how it works</Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}