import { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../Card";
import { IPokemonData } from "../../types/types";
import { LIMIT, MAX_COUNT, MIN_COUNT } from "../../constants";

import styles from "./searchResults.module.scss";

interface SearchResultsProps {
  searchResults: IPokemonData[];
}

function SearchResults({ searchResults }: SearchResultsProps): ReactElement {
  const [searchParams] = useSearchParams();

  const limit = searchParams.get("limit") || LIMIT;
  const page = searchParams.get("offset") || MIN_COUNT;

  const lastPage = Math.ceil(Number(MAX_COUNT) / Number(limit));
  const lastPageCount = Number(MAX_COUNT) - Number(limit) * (lastPage - 1);

  const pageResults = Number(page) === lastPage ? [...searchResults].slice(0, lastPageCount) : searchResults;

  return (
    <div className={styles.results}>
      {pageResults.length > 0 && pageResults.map((data) => <Card key={data.id} name={data.name} image={data.image} />)}
    </div>
  );
}

export default SearchResults;
