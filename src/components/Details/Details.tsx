import { ReactElement } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../Button";
import { Message } from "../Message";
import { useAppContext } from "../../hooks";
import { getSearchParam } from "../../utils";
import { ERROR__DETAILS, LOADER__MESSAGE } from "../../constants";

import { useAppSelector } from "../../store/store";

import styles from "./details.module.scss";

function Details(): ReactElement {
  const navigate = useNavigate();

  const { pokemonDetails, isLoading, error } = useAppSelector((state) => state.pokemonDetails);
  const { setSelectedItem } = useAppContext();

  const [searchParams] = useSearchParams();

  const page = getSearchParam(searchParams, "page");
  const limit = getSearchParam(searchParams, "limit");

  function handleClose(): void {
    setSelectedItem("");
    navigate(`/?limit=${limit}&page=${page}`);
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
