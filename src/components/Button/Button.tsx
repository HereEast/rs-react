import { ReactElement, MouseEvent } from "react";

import classnames from "classnames";
import styles from "./button.module.scss";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  name: string | number;
  className?: string;
  disabled?: boolean;
  onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
}

function Button({ name, type = "button", className, disabled, onClick }: ButtonProps): ReactElement {
  return (
    <button
      type={type}
      className={classnames(styles.button, className || "")}
      onClick={(event): void => onClick(event)}
      disabled={disabled}
    >
      {name}
    </button>
  );
}

export default Button;
