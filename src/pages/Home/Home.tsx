import { ReactElement, useEffect } from "react";
import { useSearchParams, Outlet } from "react-router-dom";
import { Message } from "../../components/Message";
import { SearchResults } from "../../components/SearchResults";
import { Pagination } from "../../components/Pagination";
import { useFetching } from "../../hooks/useFetching";
import { useDetailsContext } from "../../hooks/useDetailsContext";
import { INIT_PARAMS } from "../../constants";
import { Header } from "../../components/Header";

import classnames from "classnames";
import styles from "./home.module.scss";

// Limit page and limit

function Home(): ReactElement {
  const { selectedItem } = useDetailsContext();
  const { fetchData, searchResults, isLoading, isError, setIsError } = useFetching();

  const [searchParams, setSearchParams] = useSearchParams(INIT_PARAMS);

  useEffect(() => {
    setSearchParams(searchParams.toString());
    fetchData(searchParams.toString());
  }, [searchParams]);

  useEffect(() => {
    if (isError) {
      throw new Error("Test error is thrown!");
    }
  }, [isError]);

  function handleThrowError(): void {
    setIsError(true);
  }

  return (
    <div className={classnames(styles.page, selectedItem ? styles.page__split : "")}>
      <section className={classnames(styles.page__column, styles.page__results)}>
        <Header isLoading={isLoading} onSearch={fetchData} throwError={handleThrowError} />

        <Pagination isLoading={isLoading} />

        {isError && <Message message="Oops!.. Something wrong. Try again!" />}
        {isLoading && <Message message="Loading..." />}

        {!isError && !isLoading && <SearchResults searchResults={searchResults} />}
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
