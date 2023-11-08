import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { Button } from "../Button";

import styles from "./searchInput.module.scss";

interface SearchInputProps {
  onSearch: (searchString: string) => void;
  isLoading: boolean;
}

function SearchInput({ onSearch, isLoading }: SearchInputProps): ReactElement {
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const savedSearchString = localStorage.getItem("searchString");
    if (savedSearchString) {
      setSearchString(savedSearchString);
    }
  }, []);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearchString(e.target.value);
  }

  function handleSearch(): void {
    const searchItem = searchString.toLowerCase().trim();

    localStorage.setItem("searchString", searchItem);
    onSearch(searchString);
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

      <Button name="Search" onClick={handleSearch} disabled={isLoading} />
    </div>
  );
}

export default SearchInput;
