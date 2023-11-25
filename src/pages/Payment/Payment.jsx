import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InnerPageBanner from "../../components/shared/InnerPageBanner";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_payment_api);
const Payment = () => {
  return (
    <div>
      <InnerPageBanner
        title={"Confirm Your Payment"}
        subTitle={"Payment"}
      ></InnerPageBanner>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
