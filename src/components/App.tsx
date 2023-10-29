import { Component, ReactElement } from "react";
import SearchInput from "./SearchInput";
import ResultItem from "./ResultItem";

interface IPokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string;
}

interface AppState {
  searchResults: IPokemonData[];
  error: string | null;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchResults: [],
      error: null,
    };
  }

  async getPokemonData(results): Promise<IPokemonData[]> {
    const pokemonDataPromises = results.map(async (result) => {
      const response = await fetch(result.url);
      const data = await response.json();

      return {
        name: data.name,
        height: data.height,
        weight: data.weight,
        image: data.sprites.other["official-artwork"]["front_default"] || "",
      };
    });

    const pokemonData = await Promise.all(pokemonDataPromises);
    return pokemonData;
  }

  fetchResults = async (searchString: string): Promise<void> => {
    const URL = searchString
      ? `https://pokeapi.co/api/v2/pokemon/${searchString}`
      : "https://pokeapi.co/api/v2/pokemon?limit=600";

    console.log(URL);

    try {
      const response = await fetch(URL);
      const res = await response.json();
      const results = res.results;

      console.log(results);

      const pokemonData = await this.getPokemonData(results);
      this.setState({ searchResults: pokemonData });

      console.log(pokemonData);
    } catch (error) {
      console.log(error);
    }
  };

  handleSearch = (searchString: string): void => {
    this.fetchResults(searchString);
  };

  handleThrowError = (): void => {
    throw new Error("Test error");
  };

  render(): ReactElement {
    const { searchResults } = this.state;

    // if (error) {
    //   return (
    //     <div>
    //       <h1>Error occurred</h1>
    //       <button onClick={this.handleThrowError}>Throw Error</button>
    //     </div>
    //   );
    // }

    return (
      <div className="page">
        <SearchInput onSearch={this.handleSearch} />

        <div className="results">
          {searchResults.length > 0 ? (
            searchResults.map((data) => (
              <ResultItem key={data.id} name={data.name} height={data.height} weight={data.weight} image={data.image} />
            ))
          ) : (
            <p>No search results found.</p>
          )}
        </div>
        {/* <button onClick={this.handleThrowError}>Throw Error</button> */}
      </div>
    );
  }
}

export default App;
