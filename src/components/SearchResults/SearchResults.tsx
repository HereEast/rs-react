import { ReactElement } from "react";
import { Card } from "../Card";
import { IPokemonData } from "../../types/types";

import styles from "./searchResults.module.scss";

interface SearchResultsProps {
  searchResults: IPokemonData[];
}

function SearchResults({ searchResults }: SearchResultsProps): ReactElement {
  return (
    <div className={styles.results}>
      {searchResults.length > 0 &&
        searchResults.map((data) => (
          <Card key={data.id} name={data.name} height={data.height} weight={data.weight} image={data.image} />
        ))}
    </div>
  );
}

export default SearchResults;
