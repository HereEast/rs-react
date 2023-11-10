import { ReactElement, useEffect, useState } from "react";
import { SearchInput } from "../SearchInput";
import { Button } from "../Button";

import styles from "./header.module.scss";

interface HeaderProps {
  isLoading: boolean;
  handleSearch: (searchString: string) => void;
}

function Header({ isLoading, handleSearch }: HeaderProps): ReactElement {
  const [thrownError, setThrownError] = useState(false);

  useEffect(() => {
    if (thrownError) {
      throw new Error("Test error is thrown!");
    }
  }, [thrownError]);

  function handleThrowError(): void {
    setThrownError(true);
  }

  return (
    <header className={styles.header}>
      <span className={styles.header__note}>
        The total number of Pokémon is limited to 300 due to practical reasons.
      </span>

      <div className={styles.header__controls}>
        <SearchInput handleSearch={handleSearch} isLoading={isLoading} />
        <Button name="Throw Error ⚡️" onClick={handleThrowError} disabled={isLoading} />
      </div>
    </header>
  );
}

export default Header;
