import { ReactElement } from "react";
import { SearchInput } from "../SearchInput";
import { Button } from "../Button";

import styles from "./header.module.scss";

interface HeaderProps {
  isLoading: boolean;
  onSearch: (searchString: string) => void;
  throwError: () => void;
}

function Header({ isLoading, onSearch, throwError }: HeaderProps): ReactElement {
  return (
    <header className={styles.header}>
      <span className={styles.header__note}>
        The total number of Pokémon is limited to 300 due to practical reasons.
      </span>

      <div className={styles.header__controls}>
        <SearchInput onSearch={onSearch} isLoading={isLoading} />
        <Button name="Throw Error ⚡️" onClick={throwError} disabled={isLoading} />
      </div>
    </header>
  );
}

export default Header;
