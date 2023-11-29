import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../store/store";
import { setSelectedItem } from "../../store/selectedItem/slice";

import classnames from "classnames";
import styles from "./card.module.scss";

interface CardProps {
  key?: number;
  name: string;
  image: string | null;
}

function Card({ name, image }: CardProps): ReactElement {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const page = router.query.page as string;
  const limit = router.query.limit as string;

  function handleCardClick(): void {
    dispatch(setSelectedItem(name));

    router.push({
      pathname: "/",
      query: {
        details: name,
        limit: limit,
        page: page,
      },
    });
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
