import { ReactElement } from "react";
import { Card } from "../Card";
import { Message } from "../Message";
import { LOADER__MESSAGE } from "../../constants";

import styles from "./searchResults.module.scss";
import { useAppContext } from "../../hooks";

interface SearchResultsProps {
  isLoading: boolean;
  error: string;
}

function SearchResults({ isLoading, error }: SearchResultsProps): ReactElement {
  const { searchResults } = useAppContext();

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
