import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../Button";
import { Message } from "../Message";
import { useAppContext } from "../../hooks";
import { useGetPokemonQuery } from "../../store/query";
import { getSearchParam, parseData } from "../../utils";
import { IPokemonData } from "../../types/types";
import { ERROR__DETAILS, LOADER__MESSAGE } from "../../constants";

import styles from "./details.module.scss";

function Details(): ReactElement {
  const navigate = useNavigate();

  const { selectedItem, setSelectedItem } = useAppContext();
  const { data, isLoading, isSuccess, isError } = useGetPokemonQuery(selectedItem);

  const [pokemon, setPokemon] = useState<IPokemonData | undefined>(undefined);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isSuccess) {
      const result = parseData(data);
      setPokemon(result);
    }
  }, [isSuccess, data]);

  const page = getSearchParam(searchParams, "page");
  const limit = getSearchParam(searchParams, "limit");

  function handleClose(): void {
    setSelectedItem("");
    navigate(`/?limit=${limit}&page=${page}`);
  }

  return (
    <div className={styles.details__container} data-testid="details">
      {isLoading && <Message message={LOADER__MESSAGE} />}
      {isError && <Message message={ERROR__DETAILS} />}

      {!isLoading && !isError && (
        <>
          <div className={styles.details}>
            <div className={styles.details__image}>
              <img src={pokemon?.image} alt={`Image of ${pokemon?.name.toUpperCase()}`} />
            </div>
            <div className={styles.details__info}>
              <h2>{pokemon?.name.toUpperCase()}</h2>
              <div className={styles.details__characteristics}>
                <span>Weight: {pokemon?.weight}</span>
                <span>Height: {pokemon?.height}</span>
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
