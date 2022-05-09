import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function Home() {
  const router = useRouter();
  const { userToken, bankToken, ssnToken } = router.query;

  const [backgroundCheckToken, setBackgroundCheckToken] = useState(null);
  const [createAccountToken, setCreateAccountToken] = useState(null);
  const [chargeAccountToken, setChargeAccountToken] = useState(null);

  const backgroundCheck = () => {
    axios
      .post("/api/background-check", { userToken, ssnToken })
      .then(({ data, ...rest }) => {
          setBackgroundCheckToken(data);
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
    <div className={styles.container}>
      <Head>
        <title>Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>🎉 Account Created</h1>

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
          <h2>KYC Check</h2>
          {backgroundCheckToken && (
            <SyntaxHighlighter language="json">
              {JSON.stringify(backgroundCheckToken, undefined, "\t")}
            </SyntaxHighlighter>
          )}

          <button onClick={backgroundCheck}>Perform KYC Check</button>
        </div>

        <div className={styles.snippet}>
          <h2>Create Bank Account</h2>
          {createAccountToken && (
            <SyntaxHighlighter language="json">
              {JSON.stringify(createAccountToken, undefined, "\t")}
            </SyntaxHighlighter>
          )}
          <button onClick={createAccount}>Create</button>
        </div>

        {createAccountToken && 
          <div className={styles.snippet}>
            <h2>Pay for Policy</h2>
            {chargeAccountToken && (
              <SyntaxHighlighter language="json">
                {JSON.stringify(chargeAccountToken, undefined, "\t")}
              </SyntaxHighlighter>
            )}
            <button onClick={chargeAccount}>Pay Now</button>
          </div>
        }

        <div>
          <button
            className={styles.backButton}
            onClick={() => router.push("/")}
          >
            Setup Another Account
          </button>
        </div>
      </main>
    </div>
  );
}