import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../Button";
import { getPokemon } from "../../utils/getPokemon";
import { IPokemonData } from "../../types/types";
import { useDetailsContext } from "../../hooks/useDetailsContext";

import styles from "./details.module.scss";

function Details(): ReactElement {
  const [details, setDetails] = useState<null | IPokemonData>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { selectedItem, setSelectedItem } = useDetailsContext();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getPokemonDetails = async (): Promise<void> => {
      setIsLoading(true);

      try {
        if (selectedItem) {
          const data = await getPokemon(selectedItem);
          setDetails(data[0]);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    getPokemonDetails();
  }, [selectedItem]);

  function handleClose(): void {
    setSelectedItem(null);
    navigate(`/?${searchParams.toString()}`);
  }

  return (
    <>
      {isLoading && "Loading..."}
      {!isLoading && (
        <div className={styles.details}>
          <div className={styles.details__content}>
            <h2>{details?.name.toUpperCase()}</h2>
            <span>Weight: {details?.weight}</span>
            <span>Height: {details?.height}</span>
          </div>
          <Button name="Close" onClick={handleClose} />
        </div>
      )}
    </>
  );
}

export default Details;
