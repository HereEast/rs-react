import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../Button";
import { Message } from "../Message";
import { useDetailsContext } from "../../hooks";
import { fetchPokemon } from "../../utils";
import { IPokemonData } from "../../types/types";

import styles from "./details.module.scss";

function Details(): ReactElement {
  const [details, setDetails] = useState<null | IPokemonData>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { selectedItem, setSelectedItem } = useDetailsContext();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function getPokemonDetails(): Promise<void> {
      setIsLoading(true);
      setIsError(false);

      try {
        if (selectedItem) {
          const [data] = await fetchPokemon(selectedItem);
          setDetails(data);
        }
      } catch (error) {
        if (error instanceof Error) {
          setIsError(true);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getPokemonDetails();
  }, [selectedItem]);

  function handleClose(): void {
    setSelectedItem(null);
    navigate(`/?${searchParams.toString()}`);
  }

  return (
    <div className={styles.details__container}>
      {isError && <Message message="Oops!.. Something wrong. Try again!" />}
      {isLoading && <Message message="Loading..." />}

      {!isLoading && !isError && (
        <>
          <div className={styles.details}>
            <div className={styles.details__image}>
              <img src={details?.image} alt={`Image of ${details?.name.toUpperCase()}`} />
            </div>
            <div className={styles.details__info}>
              <h2>{details?.name.toUpperCase()}</h2>
              <div className={styles.details__characteristics}>
                <span>Weight: {details?.weight}</span>
                <span>Height: {details?.height}</span>
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
