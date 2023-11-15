import { ReactElement } from "react";
import { Card } from "../Card";
import { Message } from "../Message";
import { useAppSelector } from "../../store/store";
import { LOADER__MESSAGE } from "../../constants";

import styles from "./searchResults.module.scss";

function SearchResults(): ReactElement {
  const { searchResults, error, isLoading } = useAppSelector((state) => state.pokemon);

  return (
    <>
      {error && <Message message={error} />}
      {isLoading && <Message message={LOADER__MESSAGE} />}

      {!isLoading && !error && (
        <div className={styles.results}>
          {searchResults?.length > 0 &&
            searchResults.map((result) => <Card key={result.id} name={result.name} image={result.image} />)}
        </div>
      )}
    </>
  );
}

export default SearchResults;
