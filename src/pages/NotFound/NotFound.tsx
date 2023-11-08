import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Message } from "../../components/Message";
import { INIT_PARAMS } from "../../constants";

import classnames from "classnames";
import styles from "./notFound.module.scss";

function NotFound(): ReactElement {
  return (
    <Message message="Page not found (404)">
      <Link to={`/?${INIT_PARAMS}`} className={classnames(styles.link, styles.link_button)}>
        Back to main
      </Link>
    </Message>
  );
}

export default NotFound;
