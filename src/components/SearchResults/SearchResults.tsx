import { ReactElement } from "react";
import { Card } from "../Card";
import { Message } from "../Message";
import { IPokemonData } from "../../types/types";
import { LOADER__MESSAGE } from "../../constants";

import styles from "./searchResults.module.scss";

interface SearchResultsProps {
  searchResults: IPokemonData[] | undefined;
  isLoading: boolean;
  error: string;
}

function SearchResults({ searchResults, isLoading, error }: SearchResultsProps): ReactElement {
  return (
    <>
      {error && <Message message={error} />}
      {isLoading && <Message message={LOADER__MESSAGE} />}

      {!isLoading && !error && (
        <div className={styles.results}>
          {searchResults &&
            searchResults?.length > 0 &&
            searchResults.map((result) => <Card key={result.id} name={result.name} image={result.image} />)}
        </div>
      )}
    </>
  );
}

export default SearchResults;
