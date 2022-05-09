## Getting Started

### Create a Reactor from the Stripe Create Bank Account Formula

Log into your Portal and create a new Reactor by selecting the `Stripe - Create Bank Account for a Customer`, note the `id` and enter that into the `STRIPE_REACTOR_ID` in the file below.

### Create Environment variables

Create a `.env.local` with your secrets

```
NEXT_PUBLIC_BASISTHEORY_ELEMENTS_APPLICATION=
BASIS_THEORY_SERVER_APPLICATION=
STRIPE_REACTOR_ID=
STRIPE_SECRET_KEY=
ALLOY_API_KEY=
```

## Running

First, run the development server:

```bash
npm run dev
# or
yarn dev
```