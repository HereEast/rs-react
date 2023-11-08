import { ReactElement, useEffect, useState, MouseEvent } from "react";
import { useSearchParams, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Message } from "../../components/Message";
import { SearchResults } from "../../components/SearchResults";
import { Pagination } from "../../components/Pagination";
import { NotFound } from "../NotFound";
import { useFetchPokemon, useDetailsContext, useMaxPage } from "../../hooks";
import { INIT_PARAMS, LIMIT, MIN_COUNT } from "../../constants";

import classnames from "classnames";
import styles from "./home.module.scss";

// Limit page and limit

function Home(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedItem, setSelectedItem } = useDetailsContext();
  const { maxPage, getMaxPage } = useMaxPage();
  const { getPokemon, getAllPokemon, searchResults, isLoading, error } = useFetchPokemon();

  const [searchParams, setSearchParams] = useSearchParams(INIT_PARAMS);
  const [isError, setIsError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNotFound(false);

    if (location.pathname !== "/") {
      setNotFound(true);
    } else {
      getMaxPage(searchParams);

      const limit = parseInt(searchParams.get("limit") || LIMIT, 10);
      const page = parseInt(searchParams.get("offset") || MIN_COUNT, 10);

      setSearchParams({ limit: String(limit), offset: String(page) });
    }

    const searchString = localStorage.getItem("searchString") || "";
    handleSearch(searchString);
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

  function handleClose(e: MouseEvent): void {
    if (!(e.target instanceof HTMLElement) || !selectedItem) {
      return;
    }

    if (e.target.closest(".page__results") && !e.target.closest(".card")) {
      setSelectedItem(null);
      navigate(`/?${searchParams.toString()}`);
    }
  }

  return (
    <>
      {notFound && <NotFound />}
      {!notFound && (
        <div
          className={classnames(styles.page, selectedItem ? styles.page__split : "")}
          onClick={(e): void => handleClose(e)}
        >
          <section className={classnames(styles.page__column, "page__results")}>
            <Header isLoading={isLoading} onSearch={handleSearch} throwError={handleThrowError} />

            <Pagination isLoading={isLoading} maxPage={maxPage} />

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
      )}
    </>
  );
}

export default Home;
