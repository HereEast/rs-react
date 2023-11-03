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

function Main(): ReactElement {
  const [fetchData, searchResults, isLoading, isError, setIsError] = useFetching();

  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(searchParams.get("offset") || "1");
  const [limit, setLimit] = useState(LIMIT);

  useEffect(() => {
    const limitURL = searchParams.get("limit") || LIMIT;

    if (limit !== limitURL) {
      setSearchParams({ limit: limitURL, offset: "1" });
      setLimit(limitURL);
      console.log(limit, limitURL, page);
    } else {
      setSearchParams({ limit: limit, offset: page });
    }

    fetchData(page, limit);
  }, [page, limit]);

  // useEffect(() => {
  //   console.log("Query:", query);
  //   const pageURL = searchParams.get("offset") || "1";

  //   setSearchParams({ limit: limit, offset: page });

  //   fetchData(page, limit);
  // }, [page, limit]);

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

      <Pagination page={page} setPage={setPage} limit={limit} />

      {!isError && !isLoading && <SearchResults searchResults={searchResults} />}
    </div>
  );
}

export default Main;
