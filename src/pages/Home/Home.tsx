import { ReactElement, useEffect, MouseEvent, useState } from "react";
import { useSearchParams, Outlet, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { SearchResults } from "../../components/SearchResults";
import { Pagination } from "../../components/Pagination";
import { NotFound } from "../NotFound";
import { useAppContext } from "../../hooks";
import { getLocalStorage, getSearchParam } from "../../utils";
import { INIT_PARAMS } from "../../constants";
import { useAppDispatch } from "../../store/store";
import { pokemonThunk, allPokemonThunk } from "../../store/pokemon/thunk";

import classnames from "classnames";
import styles from "./home.module.scss";

function Home(): ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { details } = useParams();
  const { selectedItem, setSelectedItem } = useAppContext();

  const [correctPath, setCorrectPath] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams(INIT_PARAMS);

  const limit = getSearchParam(searchParams, "limit");
  const page = getSearchParam(searchParams, "page");

  useEffect(() => {
    if (details && details !== `details-${selectedItem}`) {
      setCorrectPath(false);
    }
  }, [details, selectedItem, setCorrectPath]);

  useEffect(() => {
    if (details) {
      setSelectedItem(details.split("details-")[1]);
    } else {
      setSearchParams({ limit: limit, page: page });
    }

    const savedSearchString = getLocalStorage("searchString");

    if (savedSearchString) {
      dispatch(pokemonThunk(savedSearchString));
    } else {
      dispatch(allPokemonThunk({ limit: limit, page: page }));
    }
  }, [limit, page]);

  function handleClose(e: MouseEvent): void {
    if (!(e.target instanceof HTMLElement) || !selectedItem) {
      return;
    }

    if (e.target.closest(".page__results") && !e.target.closest(".card")) {
      setSelectedItem(null);
      navigate(`/?limit=${limit}&page=${page}`);
    }
  }

  return (
    <>
      {!correctPath && <NotFound />}
      {correctPath && (
        <div
          className={classnames(styles.page, selectedItem ? styles.page__split : "")}
          onClick={(e): void => handleClose(e)}
        >
          <section className={classnames(styles.page__column, styles.page__results, "page__results")}>
            <Header />
            <Pagination />
            <SearchResults />
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
