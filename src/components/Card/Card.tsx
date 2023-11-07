import { ReactElement } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDetailsContext } from "../../hooks/useDetailsContext";

import styles from "./card.module.scss";

interface CardProps {
  key: number;
  name: string;
  image: string;
}

function Card({ name, image }: CardProps): ReactElement {
  const { setSelectedItem } = useDetailsContext();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleCardClick(): void {
    setSelectedItem(name);
    navigate(`details-${name}?${searchParams.toString()}`);
  }

  return (
    <div className={styles.card} onClick={handleCardClick}>
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
