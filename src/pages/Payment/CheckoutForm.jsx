import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";
import Container from "../../components/shared/Container";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setclientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const duration = params.get("duration");
  const price = params.get("price");

  const totalPrice = parseFloat(price);
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setclientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("PaymentMethod", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "demo@gmail.com",
            name: user?.displayName || "mr. X",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("success", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // now save the paymeent in database

        const expireDate = new Date();

        if (duration === "1-min") {
          expireDate.setSeconds(expireDate.getSeconds() + 60);
        } else if (duration === "5-days") {
          expireDate.setDate(expireDate.getDate() + 5);
        } else if (duration === "10-days") {
          expireDate.setDate(expireDate.getDate() + 10);
        }

        const userInfo = {
          premiumTaken: true,
          premimiumExpire: expireDate,
        };

        axiosSecure.patch(`/users/${user?.email}`, userInfo).then(() => {
          Swal.fire({
            icon: "success",
            title: "Your payment is success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/premiumArticles");
        });
      }
    }
  };

  return (
    <Container>
      <div className="max-w-xl w-full mx-auto py-16">
        <form className="pt-10" onSubmit={handleSubmit}>
          <h2 className="mb-4 text-xl">Privide your card Info</h2>
          <div className="border p-2 max-w-xl">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <button
            className="btn bg-[#ff184e] border-[#ff184e] rounded  hover:bg-[#4c5161] hover:border-[#4c5161] text-white font-medium uppercase mt-2 w-24"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          <p className="bg-red-600">{error}</p>
          {transactionId && (
            <p className="text-green-400">Your trans Id: {transactionId}</p>
          )}
        </form>
      </div>
    </Container>
  );
};

export default CheckoutForm;
