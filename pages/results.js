import Head from "next/head";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import SyntaxHighlighter from "react-syntax-highlighter";

import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const { userToken, bankToken, ssnToken } = router.query;

  const [creditCheckToken, setCreditCheckToken] = useState(null);
  const [createAccountToken, setCreateAccountToken] = useState(null);
  const [chargeAccountToken, setChargeAccountToken] = useState(null);

  const creditCheck = () => {
    axios
      .post("/api/credit-check", { userToken, ssnToken })
      .then(({ data, ...rest }) => {
          setCreditCheckToken(data);
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
    <Container maxWidth="md">
      <Head>
        <title>Results</title>
      </Head>

      <h1 className={styles.title}>🎉 Account Created</h1>

      <div>
        <div className="progress" style={{ 'width': '500px' }}>
          <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>

      <div className={styles.snippet}>
        <h2>Your Tokens</h2>
        <ul>
          <li>
            <strong>Bank</strong> - {bankToken}
          </li>
          <li>
            <strong>User</strong> - {userToken}
          </li>
          <li>
            <strong>SSN</strong> - {ssnToken}
          </li>
        </ul>
      </div>

      <div className={styles.snippet}>
        <h2>
          KYC Check 
          {creditCheckToken && <span className={styles.checkmark}></span>}
        </h2>

        {creditCheckToken && !createAccountToken && (
          <SyntaxHighlighter language="json">
            {JSON.stringify(creditCheckToken, undefined, "\t")}
          </SyntaxHighlighter>
        )}

        {!creditCheckToken &&
          <button onClick={creditCheck} className="button">Perform KYC Check</button>
        }
      </div>
      
      {creditCheckToken && 
        <div className={styles.snippet}>
          <h2>
            Create Bank Account
            {createAccountToken && <span className={styles.checkmark}></span>}
          </h2>

          {createAccountToken && !chargeAccountToken && (
            <SyntaxHighlighter language="json">
              {JSON.stringify(createAccountToken, undefined, "\t")}
            </SyntaxHighlighter>
          )}

          {!createAccountToken &&
            <button onClick={createAccount} className="button">Create</button>
          }
        </div>
      }

      {createAccountToken && 
        <div className={styles.snippet}>
          <h2>
            Onboard Funds
            {chargeAccountToken && <span className={styles.checkmark}></span>}
          </h2>

          {chargeAccountToken && (
            <SyntaxHighlighter language="json">
              {JSON.stringify(chargeAccountToken, undefined, "\t")}
            </SyntaxHighlighter>
          )}

          {!chargeAccountToken &&
            <button onClick={chargeAccount} className="button">Pay Now</button>
          }
        </div>
      }
    </Container>
  );
}