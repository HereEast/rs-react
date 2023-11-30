import { ReactElement, ReactNode } from "react";

import classnames from "classnames";
import styles from "./message.module.scss";

interface MessageProps {
  message: string;
  className?: string;
  children?: ReactNode;
}

function Message({ message, className, children }: MessageProps): ReactElement {
  return (
    <div className={classnames(styles.message, className)}>
      <span>{message}</span>
      {children}
    </div>
  );
}

export default Message;
