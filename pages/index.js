import Head from 'next/head'
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from '../styles/Home.module.css'
import { useHome } from '@/components/index.hooks';
import {
  TextElement,
  BasisTheoryProvider,
} from "@basis-theory/basis-theory-react";

export default function Home() {
  const { bt, submit } = useHome();

  return (
    <Container maxWidth="md">
      <Head>
        <title>Credit App</title>
      </Head>

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Create your account
        </Typography>

        <div id="form">
          <BasisTheoryProvider bt={bt}>
          <h3>Contact Information</h3>

            <div className={styles.fieldColumns}>
              <div className="field-wrapper">
                <span className="field-title">
                  First Name
                </span>
                <div className="row-input">
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
                <div className="row-input">
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
                <div className="row-input">
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
                <div className="row-input">
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
                <div className="row-input">
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
                <div className="row-input">
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
                <div className="row-input">
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
                <div className="row-input">
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
                <div className="row-input">
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
                <div className="row-input">
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
                <div className="row-input">
                  <TextElement 
                    id="account_number"
                    placeholder="Account #" 
                  />
                </div>
              </div>
            </div>
          </BasisTheoryProvider>

          <Button variant="contained" onClick={submit} disabled={!bt}>Submit</Button>
        </div>
      </Paper>
    </Container>
  )
}
