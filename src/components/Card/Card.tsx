import { ReactElement } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../../hooks";
import { getSearchParam } from "../../utils";

import classnames from "classnames";
import styles from "./card.module.scss";

interface CardProps {
  key?: number;
  name: string;
  image: string | null;
}

function Card({ name, image }: CardProps): ReactElement {
  const navigate = useNavigate();

  const { setSelectedItem } = useAppContext();
  const [searchParams] = useSearchParams();

  const page = getSearchParam(searchParams, "page");
  const limit = getSearchParam(searchParams, "limit");

  function handleCardClick(): void {
    setSelectedItem(name);
    navigate(`details-${name}?limit=${limit}&page=${page}`);
  }

  return (
    <div className={classnames(styles.card, "card")} onClick={handleCardClick} data-testid="card">
      <div className={styles.card__image}>
        <img
          className={styles.image}
          src={image || ""}
          alt={image ? `Image of ${name.toUpperCase()}` : "Image is not available."}
        />
      </div>
      <div className={styles.card__data}>
        <h3 className={styles.card__data_name}>{name.replace(/-/gi, " ")}</h3>
      </div>
    </div>
  );
}

export default Card;
