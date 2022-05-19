import Head from 'next/head'
import {
  Container,
  Paper,
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  TextElement,
  BasisTheoryProvider,
} from "@basis-theory/basis-theory-react";
import { useHowWeBuiltIt } from '@/components/HowWeBuiltIt.hooks';

import styles from '../styles/Home.module.css'

export default function HowWeBuiltIt() {
  const {
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
  } = useHowWeBuiltIt();

  return (
    <Container maxWidth="lg">
      <Head>
        <title>How We Did It</title>
      </Head>

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" sx={{ mb: 3 }}>
          Your Tokens
        </Typography>

        <Paper variant="outlined" className='token-paper' sx={{ color: '#00B68A' }}>
          <span className='token-badge token-badge-green'>User</span> {userToken}
        </Paper>
        <Paper variant="outlined" className='token-paper' sx={{ color: '#F56C9D' }}>
          <span className='token-badge token-badge-red'>SSN</span> {ssnToken}
        </Paper>
        <Paper variant="outlined" className='token-paper' sx={{ color: '#5383FF' }}>
          <span className='token-badge token-badge-blue'>Bank</span> {bankToken}
        </Paper>
      </Paper>

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Accordion expanded={expanded === 'form'} onChange={handleChange('form')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="form-content"
            id="form-header"
          >
            <Typography>Basis Theory Elements</Typography>
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
                    <div className="row-input" style={{ 'border-bottom': '0.1rem solid #00B68A', padding: '0.5rem' }}>
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
                    <div className="row-input" style={{ 'border-bottom': '0.1rem solid #00B68A', padding: '0.5rem' }}>
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
                    <div className="row-input" style={{ 'border-bottom': '0.1rem solid #00B68A', padding: '0.5rem' }}>
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
                    <div className="row-input" style={{ 'border-bottom': '0.1rem solid #00B68A', padding: '0.5rem' }}>
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
                    <div className="row-input" style={{ 'border-bottom': '0.1rem solid #00B68A', padding: '0.5rem' }}>
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
                    <div className="row-input" style={{ 'border-bottom': '0.1rem solid #00B68A', padding: '0.5rem' }}>
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
                    <div className="row-input" style={{ 'border-bottom': '0.1rem solid #00B68A', padding: '0.5rem' }}>
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
                    <div className="row-input" style={{ 'border-bottom': '0.1rem solid #00B68A', padding: '0.5rem' }}>
                      <TextElement
                        f id="phone"
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
                    <div className="row-input" style={{ 'border-bottom': '0.1rem solid #F56C9D', padding: '0.5rem' }}>
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
                    <div className="row-input" style={{ 'border-bottom': '0.1rem solid #5383FF', padding: '0.5rem' }}>
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
                    <div className="row-input" style={{ 'border-bottom': '0.1rem solid #5383FF', padding: '0.5rem' }}>
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
            <Typography>Basis Theory Proxy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={3}>
                <Button size="large" variant="contained" onClick={verifyIdentity}>Proxy to Alloy</Button>
              </Grid>
              <Grid item xs={9}>
                <img
                  src="/proxy.png"
                  alt="Outbound Proxy"
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>


            {verifyIdentityToken && (
              <SyntaxHighlighter language="json">
                {JSON.stringify(verifyIdentityToken, undefined, "\t")}
              </SyntaxHighlighter>
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'reactors'} onChange={handleChange('reactors')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="reactors-content"
            id="reactors-header"
          >
            <Typography>Basis Theory Reactor</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={3}>
                <Button size="large" variant="contained" onClick={connectAccount}>Run Stripe Reactor</Button>
              </Grid>
              <Grid item xs={9}>
                <img
                  src="/reactor.png"
                  alt="Outbound Proxy"
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            {connectAccountToken && (
              <SyntaxHighlighter language="json">
                {JSON.stringify(connectAccountToken, undefined, "\t")}
              </SyntaxHighlighter>
            )}
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
            <Grid container
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={3}>
                <Button size="large" variant="contained" onClick={transferFunds}>Transfer Funds</Button>
              </Grid>
              <Grid item xs={9}>
                <img
                  src="/charge-stripe.png"
                  alt="Stripe Reactor"
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>

            {transferFundsToken && (
              <SyntaxHighlighter language="json">
                {JSON.stringify(transferFundsToken, undefined, "\t")}
              </SyntaxHighlighter>
            )}
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  )
}
