import { ReactElement } from "react";

import classnames from "classnames";
import styles from "./errorMessage.module.scss";

interface MessageProps {
  message: string;
  className?: string;
}

function ErrorMessage({ message, className }: MessageProps): ReactElement {
  return (
    <div className={classnames(styles.message__error, className)}>
      <span>{message}</span>
    </div>
  );
}

export default ErrorMessage;
