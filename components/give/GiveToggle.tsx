"use client"
import { useState, FC } from "react";
import styles from "./GiveToggle.module.css";
import OneTime from "./OneTime";

type GiveToggleProps = {
    stripePublishableKey: string
}

const GiveToggle:FC<GiveToggleProps> = ({ stripePublishableKey }) => {
  const [selected, setSelected] = useState("one-time");

  return (
    <div className={styles.paymentToggle}>
      <h2 className={styles.title}>Select Below</h2>

      <div className={styles.options}>
        {/* One-Time Option */}
        <label className={styles.option}>
          <input
            type="radio"
            name="paymentOption"
            value="one-time"
            checked={selected === "one-time"}
            onChange={() => setSelected("one-time")}
          />
          <span>One-Time</span>
        </label>

        {/* Monthly Option - disabled */}
        <label className={`${styles.option} ${styles.disabled}`}>
          <input
            type="radio"
            name="paymentOption"
            value="monthly"
            disabled
            onChange={() => setSelected("monthly")}
          />
          <span>Monthly</span>
        </label>
      </div>

      {/* Display Section */}
      <div className={styles.displayBox}>
        {selected === "one-time" ? (
          <OneTime stripePublishableKey={stripePublishableKey}/>
        ) : (
          <h3>Monthly</h3>
        )}
      </div>
    </div>
  );
};

export default GiveToggle;
