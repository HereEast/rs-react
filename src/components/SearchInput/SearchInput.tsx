import { ChangeEvent, ReactElement, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../Button";
import { getLocalStorage, setLocalStorage } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { saveSearchString } from "../../store/search/slice";
import { pokemonThunk, allPokemonThunk } from "../../store/pokemon/thunk";

import styles from "./searchInput.module.scss";

function SearchInput(): ReactElement {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLoading } = useAppSelector((state) => state.pokemon);

  const [inputValue, setInputValue] = useState("");

  const limit = router.query.limit as string;
  const page = router.query.page as string;

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
