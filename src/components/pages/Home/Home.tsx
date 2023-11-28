import { ReactElement, useEffect, MouseEvent } from "react";
import { useRouter } from "next/router";
import { Header } from "../../Header";
import { SearchResults } from "../../SearchResults";
import { Pagination } from "../../Pagination";
import { Details } from "../../Details";
import { useAppContext } from "../../../hooks";
import { useAppDispatch } from "../../../store/store";
import { pokemonThunk, allPokemonThunk } from "../../../store/pokemon/thunk";
import { pokemonDetailsThunk } from "../../../store/pokemonDetails/thunk";
import { getLocalStorage } from "../../../utils";

import classnames from "classnames";
import styles from "./home.module.scss";

function Home(): ReactElement {
  const { selectedItem, setSelectedItem } = useAppContext();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const limit = router.query.limit as string;
  const page = router.query.page as string;

  useEffect(() => {
    if (router.query.details && typeof router.query.details === "string") {
      dispatch(pokemonDetailsThunk(router.query.details));
      setSelectedItem(router.query.details);
    }
  }, [router, setSelectedItem, dispatch]);

  useEffect(() => {
    const savedSearchString = getLocalStorage("searchString");

    if (savedSearchString) {
      dispatch(pokemonThunk(savedSearchString));
    } else {
      dispatch(allPokemonThunk({ limit: limit, page: page }));
    }
  }, [limit, page, dispatch]);
  //

  function handleClose(e: MouseEvent): void {
    if (!(e.target instanceof HTMLElement) || !selectedItem) {
      return;
    }

    if (e.target.closest(".page__results") && !e.target.closest(".card")) {
      setSelectedItem("");

      router.push({
        pathname: "/",
        query: { limit, page },
      });
    }
  }

  return (
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
          <Details />
        </section>
      )}
    </div>
  );
}

export default Home;
