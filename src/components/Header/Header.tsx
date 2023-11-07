import { ReactElement } from "react";
import { SearchInput } from "../SearchInput";
import { Button } from "../Button";

import styles from "./header.module.scss";

interface HeaderProps {
  isLoading: boolean;
  onSearch: () => void;
  throwError: () => void;
}

function Header({ isLoading, onSearch, throwError }: HeaderProps): ReactElement {
  return (
    <header className={styles.header}>
      <span className={styles.note}>
        The total number of Pokémon is limited to 300 due to practical considerations.
      </span>

      <SearchInput onSearch={onSearch} isLoading={isLoading} />
      <Button name="Throw Error ⚡️" onClick={throwError} disabled={isLoading} />
    </header>
  );
}

export default Header;
