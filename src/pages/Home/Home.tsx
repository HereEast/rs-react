import { ReactElement, useEffect, useState, MouseEvent } from "react";
import { useSearchParams, Outlet, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { SearchResults } from "../../components/SearchResults";
import { Pagination } from "../../components/Pagination";
import { useFetchPokemon, useDetailsContext, useMaxPage } from "../../hooks";
import { INIT_PARAMS, LIMIT, MIN_COUNT } from "../../constants";

import classnames from "classnames";
import styles from "./home.module.scss";

// Limit page and limit

function Home(): ReactElement {
  const navigate = useNavigate();
  const { details } = useParams();

  const { selectedItem, setSelectedItem } = useDetailsContext();
  const { getPokemon, getAllPokemon, searchResults, isLoading, error } = useFetchPokemon();
  const { maxPage, getMaxPage } = useMaxPage();

  const [searchParams, setSearchParams] = useSearchParams(INIT_PARAMS);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getMaxPage(searchParams);

    if (details) {
      setSelectedItem(details.split("details-")[1]);
    } else {
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
    <div
      className={classnames(styles.page, selectedItem ? styles.page__split : "")}
      onClick={(e): void => handleClose(e)}
    >
      <section className={classnames(styles.page__column, styles.page__results, "page__results")}>
        <Header isLoading={isLoading} onSearch={handleSearch} throwError={handleThrowError} />
        <Pagination isLoading={isLoading} maxPage={maxPage} />
        <SearchResults searchResults={searchResults} isLoading={isLoading} error={error} />
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
