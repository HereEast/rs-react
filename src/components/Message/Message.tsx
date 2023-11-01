import { ReactElement } from "react";

import styles from "./message.module.scss";

interface MessageProps {
  message: string;
  className?: string;
}

function Message({ message, className }: MessageProps): ReactElement {
  return (
    <div className={styles.message}>
      <span className={className}>{message}</span>
    </div>
  );
}

export default Message;
