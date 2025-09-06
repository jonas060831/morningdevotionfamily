import { useState, FC, useMemo } from "react";
import styles from "./OneTime.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { useSystemMessage } from "@/components/modals/notification/systemMessage/SystemMessageManager";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

type OneTimeProps = {
  stripePublishableKey: string;
};

const OneTime: FC<OneTimeProps> = ({ stripePublishableKey }) => {
  const stripePromise = useMemo(() => loadStripe(stripePublishableKey), [stripePublishableKey]);
  const [amount, setAmount] = useState<number | "other" | null>(null);
  const [customAmount, setCustomAmount] = useState<number | null>(null);

  const selectedAmount = amount === "other" ? customAmount : amount;

  return (
    <div>
      <h3 style={{ fontFamily: "var(--font-poiretOne)" }}>Select Amount</h3>
      <div className={styles.amountOptions}>
        {[25, 50, 100, 500].map((val) => (
          <button
            key={val}
            type="button"
            className={`${styles.amountBtn} ${amount === val ? styles.active : ""}`}
            onClick={() => setAmount(val)}
          >
            ${val}
          </button>
        ))}
        <button
          type="button"
          className={`${styles.amountBtn} ${amount === "other" ? styles.active : ""}`}
          onClick={() => setAmount("other")}
        >
          Other
        </button>
      </div>

      {/* Show input for custom amount */}
      {amount === "other" && (
        <div style={{ margin: "10px 0" }}>
          <input
            type="number"
            placeholder="Enter amount"
            value={customAmount ?? ""}
            onChange={(e) => setCustomAmount(Number(e.target.value))}
            min={1}
          />
        </div>
      )}

      {/* Show Stripe form only if amount is selected and valid */}
      {selectedAmount ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={selectedAmount} />
        </Elements>
      ) : null}
    </div>
  );
};

// Props for CheckoutForm
interface CheckoutFormProps {
  amount: number;
}

const CheckoutForm: FC<CheckoutFormProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const { showMessage } = useSystemMessage()


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);

    try {
      // 1️⃣ Call Next.js API to create PaymentIntent
      const res = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }), // amount in cents
      });

      const data = await res.json();
      const clientSecret = data.clientSecret;

      if (!clientSecret) {

        showMessage("Payment failed: No client secret returned", "error")

        setLoading(false);
        return;
      }

      // 2️⃣ Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        console.error(result.error.message);
        showMessage(`${result.error.message}`, "error")
      } else if (result.paymentIntent?.status === "succeeded") {
        showMessage(`Success! gave $${amount.toFixed(2)} `, "success")
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h4>Enter Card Details</h4>
      <CardElement className={styles.cardElement} />
      <button type="submit" disabled={!stripe || loading} className={styles.payBtn}>
        {loading ? "Processing..." : `Give $${amount}`}
      </button>
    </form>
  );
};

export default OneTime;
