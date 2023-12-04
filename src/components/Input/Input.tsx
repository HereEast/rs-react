import { ReactElement, RefObject, forwardRef } from "react";

import styles from "./input.module.scss";

interface InputProps {
  type: "text" | "number" | "radio" | "checkbox" | "email";
  label: string;
  name: string;
  id?: string;
  ref?: RefObject<HTMLInputElement>;
  list?: string;
}

const Input = forwardRef(function ({
  type,
  label,
  name,
  id,
  ref,
  list,
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
        list={list}
      />
    </label>
  );
});

export default Input;
