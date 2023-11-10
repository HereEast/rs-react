import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { Button } from "../Button";
import { getLocalStorage, setLocalStorage } from "../../utils";

import styles from "./searchInput.module.scss";

interface SearchInputProps {
  handleSearch: (searchString: string) => void;
  isLoading: boolean;
}

function SearchInput({ handleSearch, isLoading }: SearchInputProps): ReactElement {
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
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
        placeholder="Search Pokemon"
        onChange={handleInputChange}
      />

      <Button name="Search" onClick={searchPokemon} disabled={isLoading} />
    </div>
  );
}

export default SearchInput;
