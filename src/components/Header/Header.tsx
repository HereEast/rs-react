import { ReactElement, useEffect, useState } from "react";
import { SearchInput } from "../SearchInput";
import { Button } from "../Button";
import { useAppSelector } from "../../store/store";

import styles from "./header.module.scss";

function Header(): ReactElement {
  const [thrownError, setThrownError] = useState(false);

  const { isLoading } = useAppSelector((state) => state.pokemon);

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
        <SearchInput />
        <Button name="Throw Error ⚡️" onClick={handleThrowError} disabled={isLoading} />
      </div>
    </header>
  );
}

export default Header;
