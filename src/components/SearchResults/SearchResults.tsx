import { ReactElement } from "react";
import { Card } from "../Card";
import { IPokemonData } from "../../types/types";
import { MAX_COUNT } from "../../constants";

import styles from "./searchResults.module.scss";

interface SearchResultsProps {
  searchResults: IPokemonData[];
  page: string;
  limit: string;
}

function SearchResults({ searchResults, page, limit }: SearchResultsProps): ReactElement {
  const lastPage = Math.ceil(Number(MAX_COUNT) / Number(limit));
  const lastPageCount = Number(MAX_COUNT) - Number(limit) * (lastPage - 1);

  const array = Number(page) === lastPage ? [...searchResults].slice(0, lastPageCount) : searchResults;

  return (
    <div className={styles.results}>
      {array.length > 0 &&
        array.map((data) => (
          <Card key={data.id} name={data.name} height={data.height} weight={data.weight} image={data.image} />
        ))}
    </div>
  );
}

export default SearchResults;
