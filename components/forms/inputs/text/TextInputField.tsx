import React, { useState, FocusEvent, ChangeEvent } from "react";
import styles from "./TextInputField.module.css";

interface TextInputFieldProps {
  label: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) setFocused(false);
  };

  return (
    <div
      className={`${styles.floatingGroup} ${
        focused || value ? styles.active : ""
      }`}
    >
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={styles.input}
      />
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default TextInputField;
