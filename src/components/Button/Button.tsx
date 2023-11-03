import { ReactElement, MouseEvent } from "react";

import classnames from "classnames";
import styles from "./button.module.scss";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  title: string | number;
  className?: string;
  disabled?: boolean;
  onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
}

function Button({ title, type = "button", className, disabled, onClick }: ButtonProps): ReactElement {
  return (
    <button
      type={type}
      className={classnames(styles.button, className || "")}
      onClick={(event): void => onClick(event)}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default Button;
