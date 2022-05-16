import Head from 'next/head'
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SyntaxHighlighter from "react-syntax-highlighter";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import {
  TextElement,
  useBasisTheory,
  BasisTheoryProvider,
} from "@basis-theory/basis-theory-react";
import styles from '../styles/Home.module.css'

export default function Home() {
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

  return (
    <Container maxWidth="lg">
      <Head>
        <title>How We Did It</title>
      </Head>

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" sx={{ mb: 3 }}>
          Your Tokens
        </Typography>

        <Typography component="h4" variant="h6" align="center" style={{ color: 'green' }}>
          User: {userToken}
        </Typography>
        <Typography component="h4" variant="h6" align="center" style={{ color: 'red' }}>
          SSN: {ssnToken}
        </Typography>
        <Typography component="h4" variant="h6" align="center" style={{ color: 'blue' }}>
          Bank: {bankToken}
        </Typography>

        <Accordion expanded={expanded === 'form'} onChange={handleChange('form')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="form-content"
            id="form-header"
          >
            <Typography>Securely Collect Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div id="form">
              <BasisTheoryProvider bt={bt}>
                <h3>Contact Information</h3>

                <div className={styles.fieldColumns}>
                  <div className="field-wrapper">
                    <span className="field-title">
                      First Name
                    </span>
                    <div className="row-input" style={{ border: '0.2rem solid green', padding: '0.5rem' }}>
                      <TextElement 
                        id="first_name"
                        placeholder="First name"
                      />
                    </div>
                  </div>

                  <div className="field-wrapper">
                    <span className="field-title">
                      Last Name
                    </span>
                    <div className="row-input" style={{ border: '0.2rem solid green', padding: '0.5rem' }}>
                      <TextElement 
                        id="last_name"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.fieldColumns}>
                  <div className="field-wrapper">
                    <span className="field-title">
                      Street
                    </span>
                    <div className="row-input" style={{ border: '0.2rem solid green', padding: '0.5rem' }}>
                      <TextElement 
                        id="street"
                        placeholder="Street"
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.fieldColumns}>
                  <div className="field-wrapper">
                    <span className="field-title">
                      City
                    </span>
                    <div className="row-input" style={{ border: '0.2rem solid green', padding: '0.5rem' }}>
                      <TextElement 
                        id="city"
                        placeholder="City"
                      />
                    </div>
                  </div>

                  <div className="field-wrapper">
                    <span className="field-title">
                      State
                    </span>
                    <div className="row-input" style={{ border: '0.2rem solid green', padding: '0.5rem' }}>
                      <TextElement 
                        id="state"
                        placeholder="State abbrev"
                        mask={[/[A-Za-z]/, /[A-Za-z]/]}
                      />
                    </div>
                  </div>

                  <div className="field-wrapper">
                    <span className="field-title">
                      Postal Code
                    </span>
                    <div className="row-input" style={{ border: '0.2rem solid green', padding: '0.5rem' }}>
                      <TextElement 
                        id="postal_code"
                        placeholder="Postal code"
                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.fieldColumns}>
                  <div className="field-wrapper">
                    <span className="field-title">
                      Email
                    </span>
                    <div className="row-input" style={{ border: '0.2rem solid green', padding: '0.5rem' }}>
                      <TextElement 
                        id="email"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div className="field-wrapper">
                    <span className="field-title">
                      Phone
                    </span>
                    <div className="row-input" style={{ border: '0.2rem solid green', padding: '0.5rem' }}>
                      <TextElement 
                      f  id="phone"
                        placeholder="555-123-4567"
                        mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                        transform={/[-]/}
                      />
                    </div>
                  </div>

                  <div className="field-wrapper">
                    <span className="field-title">
                      SSN
                    </span>
                    <div className="row-input" style={{ border: '0.2rem solid red', padding: '0.5rem' }}>
                      <TextElement 
                        id="ssn"
                        placeholder="123-45-6789"
                        mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                        transform={/[-]/}
                      />
                    </div>
                  </div>
                </div>

                <h3>Bank Details</h3>
                <div className={styles.fieldColumns}>
                  <div className="field-wrapper">
                    <span className="field-title">
                      Routing #
                    </span>
                    <div className="row-input" style={{ border: '0.2rem solid blue', padding: '0.5rem' }}>
                      <TextElement 
                        id="routing_number"
                        placeholder="Routing #" 
                      />
                    </div>
                  </div>

                  <div className="field-wrapper">
                    <span className="field-title">
                      Account #
                    </span>
                    <div className="row-input" style={{ border: '0.2rem solid blue', padding: '0.5rem' }}>
                      <TextElement 
                        id="account_number"
                        placeholder="Account #" 
                      />
                    </div>
                  </div>
                </div>
              </BasisTheoryProvider>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'proxy'} onChange={handleChange('proxy')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="proxy-content"
            id="proxy-header"
          >
            <Typography>Proxy to Alloy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <img
              src="https://developers.basistheory.com/assets/images/what_is_the_proxy/outbound-proxy.png"
              alt="Outbound Proxy"
              style={{ width: '100%'}}
            />

            {verifyIdentityToken && (
              <SyntaxHighlighter language="json">
                {JSON.stringify(verifyIdentityToken, undefined, "\t")}
              </SyntaxHighlighter>
            )}

            <Button variant="contained" onClick={verifyIdentity}>Proxy to Alloy</Button>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'reactors'} onChange={handleChange('reactors')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="reactors-content"
            id="reactors-header"
          >
            <Typography>Run Stripe Reactor</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <img
              src="https://developers.basistheory.com/assets/images/concepts/reactors_overview.png"
              alt="Reactors"
              style={{ width: '100%'}}
            />

            {createAccountToken && (
              <SyntaxHighlighter language="json">
                {JSON.stringify(createAccountToken, undefined, "\t")}
              </SyntaxHighlighter>
            )}

            <Button variant="contained" onClick={createAccount}>Run Stripe Reactor</Button>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'direct'} onChange={handleChange('direct')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="direct-content"
            id="direct-header"
          >
            <Typography>Send Directly to Processor</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {chargeAccountToken && (
              <SyntaxHighlighter language="json">
                {JSON.stringify(chargeAccountToken, undefined, "\t")}
              </SyntaxHighlighter>
            )}

            <Button variant="contained" onClick={chargeAccount}>Charge Bank Account</Button>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  )
}
