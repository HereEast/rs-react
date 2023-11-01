import { ReactElement, useEffect, useState } from "react";
import { SearchInput } from "../SearchInput";
import { Button } from "../Button";
import { Message } from "../Message";
import { getPokemon } from "../../utils/getPokemons";
import { IPokemonData } from "../../types/types";
import { SearchResults } from "../SearchResults";

import styles from "./app.module.scss";

function App(): ReactElement {
  const [searchResults, setSearchResults] = useState<IPokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const savedSearchString = localStorage.getItem("searchString") || "";
    fetchResults(savedSearchString);
  }, []);

  useEffect(() => {
    if (isError) {
      throw new Error("Test error is thrown!");
    }
  }, [isError]);

  async function fetchResults(searchString: string): Promise<void> {
    setIsLoading(true);
    setIsError(false);

    const URL = searchString
      ? `https://pokeapi.co/api/v2/pokemon/${searchString}`
      : "https://pokeapi.co/api/v2/pokemon?limit=300";

    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw Error("Pokemon not found. Try another one!");
      }

      const data = await response.json();
      const pokemon = await getPokemon(searchString ? searchString : data.results);

      setSearchResults(pokemon);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearch(searchString: string): void {
    fetchResults(searchString);
  }

  function handleThrowError(): void {
    setIsError(true);
  }

  return (
    <div className={styles.page}>
      <header className="header">
        <span className="note">The total number of Pokémon is limited to 300 due to practical considerations.</span>

        <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        <Button title="Throw Error ⚡️" onClick={handleThrowError} disabled={isLoading} />
      </header>

      {isError && <Message message="Oops!.. Something wrong. Try again!" />}
      {isLoading && <Message message="Loading..." />}

      {!isError && !isLoading && <SearchResults searchResults={searchResults} />}
    </div>
  );
}

export default App;
