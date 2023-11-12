import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../Button";
import { Message } from "../Message";
import { useAppContext, useFetchPokemon } from "../../hooks";
import { getSearchParam } from "../../utils";
import { IPokemonData } from "../../types/types";
import { ERROR__DETAILS, LOADER__MESSAGE } from "../../constants";

import styles from "./details.module.scss";

function Details(): ReactElement {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [pokemon, setPokemon] = useState<IPokemonData | undefined>(undefined);

  const { selectedItem, setSelectedItem } = useAppContext();
  const { getPokemon, isLoading, error } = useFetchPokemon();

  const page = getSearchParam(searchParams, "page");
  const limit = getSearchParam(searchParams, "limit");

  useEffect(() => {
    async function getPokemonDetails(selectedItem: string | null): Promise<void> {
      if (selectedItem) {
        const result = await getPokemon(selectedItem);
        setPokemon(result ? result[0] : undefined);
      }
    }

    getPokemonDetails(selectedItem);
  }, [selectedItem]);

  function handleClose(): void {
    setSelectedItem(null);
    navigate(`/?limit=${limit}&page=${page}`);
  }

  return (
    <div className={styles.details__container}>
      {isLoading && <Message message={LOADER__MESSAGE} />}
      {error && <Message message={ERROR__DETAILS} />}

      {!isLoading && !error && (
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
