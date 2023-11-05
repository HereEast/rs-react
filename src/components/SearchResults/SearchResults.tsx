import { ReactElement } from "react";
import { Card } from "../Card";
import { IPokemonData } from "../../types/types";
import { MAX_COUNT } from "../../constants";

import styles from "./searchResults.module.scss";

interface SearchResultsProps {
  searchResults: IPokemonData[];
  page: string;
  limit: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
}

function SearchResults({ searchResults, page, limit, setSelectedItem }: SearchResultsProps): ReactElement {
  const lastPage = Math.ceil(Number(MAX_COUNT) / Number(limit));
  const lastPageCount = Number(MAX_COUNT) - Number(limit) * (lastPage - 1);

  const array = Number(page) === lastPage ? [...searchResults].slice(0, lastPageCount) : searchResults;

  return (
    <div className={styles.results}>
      {array.length > 0 &&
        array.map((data) => (
          <Card key={data.id} name={data.name} image={data.image} setSelectedItem={setSelectedItem} />
        ))}
    </div>
  );
}

export default SearchResults;
