import { ReactElement } from "react";

import styles from "./card.module.scss";

interface CardProps {
  key: number;
  name: string;
  height: number;
  weight: number;
  image: string;
}

function Card({ name, height, weight, image }: CardProps): ReactElement {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}>
        <img className={styles.image} src={image} alt={name} />
      </div>
      <div className={styles.card__data}>
        <h3 className={styles.card__data_name}>{name.replace(/-/gi, " ")}</h3>
        <span>Weight: {weight}</span>
        <span>Height: {height}</span>
      </div>
    </div>
  );
}

export default Card;
