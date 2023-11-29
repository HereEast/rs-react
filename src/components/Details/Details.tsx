import { ReactElement } from "react";
import { useRouter } from "next/router";
import { Button } from "../Button";
import { Message } from "../Message";
import { useAppSelector } from "../../store/store";
import { useAppDispatch } from "../../store/store";
import { setSelectedItem } from "../../store/selectedItem/slice";
import { ERROR__DETAILS, LOADER__MESSAGE } from "../../constants";

import styles from "./details.module.scss";

function Details(): ReactElement {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { pokemonDetails, isLoading, error } = useAppSelector((state) => state.pokemonDetails);

  const limit = router.query.limit as string;
  const page = router.query.page as string;

  function handleClose(): void {
    dispatch(setSelectedItem(""));

    router.push({
      pathname: "/",
      query: { limit, page },
    });
  }

  return (
    <div className={styles.details__container} data-testid="details">
      {isLoading && <Message message={LOADER__MESSAGE} />}
      {error && <Message message={ERROR__DETAILS} />}

      {!isLoading && !error && (
        <>
          <div className={styles.details}>
            <div className={styles.details__image}>
              <img src={pokemonDetails?.image || ""} alt={`Image of ${pokemonDetails?.name.toUpperCase()}`} />
            </div>
            <div className={styles.details__info}>
              <h2>{pokemonDetails?.name.toUpperCase()}</h2>
              <div className={styles.details__characteristics}>
                <span>Weight: {pokemonDetails?.weight}</span>
                <span>Height: {pokemonDetails?.height}</span>
              </div>
            </div>
          </div>
          <Button className={styles.details__button} name="Close" onClick={handleClose} />
        </>
      )}
    </div>
  );
}

export default Details;
