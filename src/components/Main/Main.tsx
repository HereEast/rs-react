import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchInput } from "../SearchInput";
import { Button } from "../Button";
import { Message } from "../Message";
import { SearchResults } from "../SearchResults";
import { Pagination } from "../Pagination";
import { LIMIT } from "../../constants";

import styles from "./main.module.scss";
import { useFetching } from "../../hooks/useFetching";

// Cards on last page
// Limit page and limit
// Disable buttons and select

function Main(): ReactElement {
  const [fetchData, searchResults, isLoading, isError, setIsError] = useFetching();

  const [searchParams, setSearchParams] = useSearchParams("");

  const [page, setPage] = useState(searchParams.get("offset") || "1");
  const [limit, setLimit] = useState(searchParams.get("limit") || LIMIT);

  useEffect(() => {
    setPage("1");
    setSearchParams({ limit: limit, offset: page });
  }, [limit]);

  useEffect(() => {
    setSearchParams({ limit: limit, offset: page });
  }, [page]);

  useEffect(() => {
    const limitURL = searchParams.get("limit") || LIMIT;

    setSearchParams({ limit: limitURL, offset: page });
    fetchData(searchParams.toString());
  }, [searchParams]);

  useEffect(() => {
    if (isError) {
      throw new Error("Test error is thrown!");
    }
  }, [isError]);

  function handleSearch(searchString: string): void {
    fetchData(searchString);
  }

  function handleThrowError(): void {
    setIsError(true);
  }

  return (
    <div className={styles.page}>
      <header className="header">
        <span className="note">The total number of Pokémon is limited to 300 due to practical considerations.</span>

        <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        <Button title="Throw Error ⚡️" onClick={handleThrowError} disabled={isLoading} />
      </header>

      {isError && <Message message="Oops!.. Something wrong. Try again!" />}
      {isLoading && <Message message="Loading..." />}

      <Pagination page={page} setPage={setPage} limit={limit} setLimit={setLimit} />

      {!isError && !isLoading && <SearchResults searchResults={searchResults} />}
    </div>
  );
}

export default Main;
