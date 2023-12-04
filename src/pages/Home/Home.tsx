import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";

import styles from "./home.module.scss";

function Home(): ReactElement {
  const { data } = useAppSelector((state) => state.formData);

  return (
    <div className={styles.container__home}>
      <nav className={styles.nav}>
        <Link to="uncontrolled-form" className={styles.nav__link}>
          Uncontrolled Form
        </Link>
        <span>🐻🐨🐼</span>
        <Link to="react-hook-form" className={styles.nav__link}>
          React Hook Form
        </Link>
      </nav>

      {data.name && (
        <div className={styles.card}>
          <img src={data.file} />
          <span>Name: {data.name}</span>
          <span>
            Gender: {data.gender[0].toUpperCase() + data.gender.slice(1)}
          </span>
          <span>Age: {data.age}</span>
          <span>Email: {data.email}</span>
          <span>Password: {data.password}</span>
          <span>Country: {data.country}</span>
        </div>
      )}
    </div>
  );
}

export default Home;
