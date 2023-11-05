import { ReactElement, useEffect, useState } from "react";
import { Button } from "../Button";
import { getPokemon } from "../../utils/getPokemon";
import { IPokemonData } from "../../types/types";

import styles from "./details.module.scss";

interface DetailsProps {
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
}

function Details({ selectedItem, setSelectedItem }: DetailsProps): ReactElement {
  const [details, setDetails] = useState<null | IPokemonData>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      {isLoading && "Loading..."}
      {!isLoading && (
        <>
          <div className={styles.details}>
            <h2>{details?.name.toUpperCase()}</h2>
            <span>Weight: {details?.weight}</span>
            <span>Height: {details?.height}</span>
          </div>
          <Button title="Close" onClick={(): void => setSelectedItem(null)} />
        </>
      )}
    </>
  );
}

export default Details;
