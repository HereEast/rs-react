import { ReactElement } from "react";
import { Card } from "../Card";
import { IPokemonData } from "../../types/types";
import { LIMIT, MAX_COUNT } from "../../constants";

import styles from "./searchResults.module.scss";
import { useSearchParams } from "react-router-dom";

interface SearchResultsProps {
  searchResults: IPokemonData[];
  page?: string;
  // limit: string;
}

function SearchResults({ searchResults, page }: SearchResultsProps): ReactElement {
  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit") || LIMIT;

  const lastPage = Math.ceil(Number(MAX_COUNT) / Number(limit));
  const lastPageCount = Number(MAX_COUNT) - Number(limit) * (lastPage - 1);

  const array = Number(page) === lastPage ? [...searchResults].slice(0, lastPageCount) : searchResults;

  return (
    <div className={styles.results}>
      {array.length > 0 && array.map((data) => <Card key={data.id} name={data.name} image={data.image} />)}
    </div>
  );
}

export default SearchResults;
