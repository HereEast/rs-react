import { ReactElement } from "react";
import { Link } from "react-router-dom";

import styles from "./home.module.scss";

function Home(): ReactElement {
  return (
    <nav className={styles.nav}>
      <Link to="uncontrolled-form" className={styles.nav__link}>
        Uncontrolled Form
      </Link>
      <span>🐻🐨🐼</span>
      <Link to="react-hook-form" className={styles.nav__link}>
        React Hook Form
      </Link>
    </nav>
  );
}

export default Home;
