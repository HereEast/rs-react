import { ReactElement, useEffect, useState } from "react";
import { useSearchParams, Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Message } from "../../components/Message";
import { SearchResults } from "../../components/SearchResults";
import { Pagination } from "../../components/Pagination";
import { useFetchPokemon, useDetailsContext } from "../../hooks";
import { INIT_PARAMS } from "../../constants";

import classnames from "classnames";
import styles from "./home.module.scss";

// Limit page and limit

function Home(): ReactElement {
  const { selectedItem } = useDetailsContext();
  const { getPokemon, getAllPokemon, searchResults, isLoading, error } = useFetchPokemon();

  const [searchParams, setSearchParams] = useSearchParams(INIT_PARAMS);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setSearchParams(searchParams.toString());

    const savedSearchString = localStorage.getItem("searchString") || "";
    handleSearch(savedSearchString);
  }, [searchParams]);

  useEffect(() => {
    if (isError) {
      throw new Error("Test error is thrown!");
    }
  }, [isError]);

  async function handleSearch(searchString: string): Promise<void> {
    if (searchString) {
      getPokemon(searchString);
    } else {
      getAllPokemon();
    }
  }

  function handleThrowError(): void {
    setIsError(true);
  }

  return (
    <div className={classnames(styles.page, selectedItem ? styles.page__split : "")}>
      <section className={classnames(styles.page__column, styles.page__results)}>
        <Header isLoading={isLoading} onSearch={handleSearch} throwError={handleThrowError} />

        <Pagination isLoading={isLoading} />

        {error && <Message message={error} />}
        {isLoading && <Message message="Loading..." />}

        {!error && !isLoading && <SearchResults searchResults={searchResults} />}
      </section>

      {selectedItem && (
        <section className={classnames(styles.page__column, styles.page__details)}>
          <Outlet />
        </section>
      )}
    </div>
  );
}

export default Home;
