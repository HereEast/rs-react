import { ReactElement, RefObject, forwardRef } from "react";

import styles from "./input.module.scss";

interface InputProps {
  type: "text" | "number" | "radio" | "checkbox";
  label: string;
  name: string;
  id?: string;
  ref?: RefObject<HTMLInputElement>;
}

const Input = forwardRef(function ({
  type,
  label,
  name,
  id,
  ref,
}: InputProps): ReactElement {
  return (
    <label htmlFor={name} className={styles.label}>
      {label}
      <input
        type={type}
        name={name}
        id={id || ""}
        className={styles.input}
        ref={ref}
      />
    </label>
  );
});

export default Input;
