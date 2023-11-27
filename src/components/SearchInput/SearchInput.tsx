import { ChangeEvent, ReactElement, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../Button";
import { getLocalStorage, setLocalStorage, getSearchParam } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { saveSearchString } from "../../store/search/slice";
import { pokemonThunk, allPokemonThunk } from "../../store/pokemon/thunk";
import { INIT_PARAMS } from "../../constants";

import styles from "./searchInput.module.scss";

function SearchInput(): ReactElement {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.pokemon);

  const [inputValue, setInputValue] = useState("");
  const [searchParams] = useSearchParams(INIT_PARAMS);

  const limit = getSearchParam(searchParams, "limit");
  const page = getSearchParam(searchParams, "page");

  useLayoutEffect(() => {
    const savedSearchString = getLocalStorage("searchString");
    if (savedSearchString) {
      setInputValue(savedSearchString);
    }
  }, []);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setInputValue(e.target.value);
  }

  function handleSearchPokemon(): void {
    const searchItem = inputValue.toLowerCase().trim();

    if (searchItem) {
      dispatch(pokemonThunk(searchItem));
    } else {
      dispatch(allPokemonThunk({ limit: limit, page: page }));
    }

    setLocalStorage("searchString", searchItem);
    dispatch(saveSearchString({ inputValue }));
  }

  return (
    <div className={styles.search}>
      <input
        className={styles.search__input}
        type="text"
        value={inputValue}
        placeholder="Search Pokemon"
        onChange={handleInputChange}
      />

      <Button name="Search" onClick={handleSearchPokemon} disabled={isLoading} />
    </div>
  );
}

export default SearchInput;
