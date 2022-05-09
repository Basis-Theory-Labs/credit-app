import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router";
import {
  TextElement,
  useBasisTheory,
  BasisTheoryProvider,
} from "@basis-theory/basis-theory-react";

export default function Home() {
  const router = useRouter();
  const { bt } = useBasisTheory(
    process.env.NEXT_PUBLIC_BASISTHEORY_ELEMENTS_APPLICATION,
    { elements: true }
  );

  const submit = async () => {
    const tokens = await bt.tokenize({
      user: {
        type: 'token',
        data: {
          first_name: bt.getElement("first_name"),
          last_name: bt.getElement("last_name"),
          email: bt.getElement("email"),
          phone: bt.getElement("phone"),
          address: {
            street: bt.getElement("street"),
            city: bt.getElement("city"),
            state: bt.getElement("state"),
            postal_code: bt.getElement("postal_code"),
          },
        },
        privacy: {
          classification: 'pii',
          impact_level: 'moderate',
        },
      },
      ssn: {
        type: 'social_security_number',
        data: bt.getElement("ssn"),
      },
      bank: {
        type: 'bank',
        data: {
          routing_number: bt.getElement("routing_number"),
          account_number: bt.getElement("account_number"),
        },
      },
    });

    router.push(`/results?userToken=${tokens.user.id}&bankToken=${tokens.bank.id}&ssnToken=${tokens.ssn.id}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Credit App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create your account
        </h1>

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
                    id="phone"
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

          <div>
            <button type="submit" onClick={submit} disabled={!bt}>
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
