import { ChangeEvent, ReactElement, useLayoutEffect } from "react";
import { Button } from "../Button";
import { getLocalStorage, setLocalStorage } from "../../utils";

import styles from "./searchInput.module.scss";
import { useAppContext } from "../../hooks";

interface SearchInputProps {
  handleSearch: (searchString: string) => void;
  isLoading: boolean;
}

function SearchInput({ handleSearch, isLoading }: SearchInputProps): ReactElement {
  const { searchString, setSearchString } = useAppContext();

  useLayoutEffect(() => {
    const savedSearchString = getLocalStorage("searchString");
    if (savedSearchString) {
      setSearchString(savedSearchString);
    }
  }, []);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearchString(e.target.value);
  }

  function searchPokemon(): void {
    const searchItem = searchString.toLowerCase().trim();

    handleSearch(searchItem);
    setLocalStorage("searchString", searchItem);
  }

  return (
    <div className={styles.search}>
      <input
        className={styles.search__input}
        type="text"
        value={searchString}
        placeholder={searchString ? "" : "Search Pokemon"}
        onChange={handleInputChange}
      />

      <Button name="Search" onClick={searchPokemon} disabled={isLoading} />
    </div>
  );
}

export default SearchInput;
