import { ReactElement } from "react";

import styles from "./card.module.scss";

interface CardProps {
  key: number;
  name: string;
  image: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
}

function Card({ name, image, setSelectedItem }: CardProps): ReactElement {
  return (
    <div className={styles.card} onClick={(): void => setSelectedItem(name)}>
      <div className={styles.card__image}>
        <img className={styles.image} src={image} alt={name} />
      </div>
      <div className={styles.card__data}>
        <h3 className={styles.card__data_name}>{name.replace(/-/gi, " ")}</h3>
      </div>
    </div>
  );
}

export default Card;
