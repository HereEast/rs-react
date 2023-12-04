import { ReactElement, MouseEvent } from "react";

import classnames from "classnames";
import styles from "./button.module.scss";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  name: string | number;
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const noop = (): void => {
  return;
};

function Button({
  name,
  type = "button",
  className,
  disabled,
  onClick = noop,
}: ButtonProps): ReactElement {
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
