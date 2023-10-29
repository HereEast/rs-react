import { Component, ReactElement } from "react";
import SearchInput from "./SearchInput";
import ResultItem from "./ResultItem";
import { IPokemonData, IPokemonBasicData } from "../types/types";

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

  async getPokemon(searchString: string): Promise<IPokemonData> {
    const URL = `https://pokeapi.co/api/v2/pokemon/${searchString}`;

    const response = await fetch(URL);
    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      image: data.sprites.other["official-artwork"]["front_default"] || "",
    };
  }

  componentDidMount(): void {
    const savedSearchString = localStorage.getItem("searchString") || "";
    this.fetchResults(savedSearchString);
  }

  async getAllPokemons(dataArray: IPokemonBasicData[]): Promise<IPokemonData[]> {
    const pokemonDataPromises = dataArray.map(async (data) => {
      const response = await this.getPokemon(data.name);
      return response;
    });

    const pokemonData = await Promise.all(pokemonDataPromises);
    return pokemonData;
  }

  async fetchResults(searchString: string): Promise<void> {
    const URL = searchString
      ? `https://pokeapi.co/api/v2/pokemon/${searchString}`
      : "https://pokeapi.co/api/v2/pokemon?limit=600";

    try {
      const response = await fetch(URL);
      const data = await response.json();

      if (searchString) {
        const pokemonData = await this.getPokemon(searchString);
        this.setState({ searchResults: [pokemonData] });
      } else {
        const pokemonData = await this.getAllPokemons(data.results);
        this.setState({ searchResults: pokemonData });
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          {searchResults.length > 0 &&
            searchResults.map((data) => (
              <ResultItem key={data.id} name={data.name} height={data.height} weight={data.weight} image={data.image} />
            ))}
        </div>
        {/* <button onClick={this.handleThrowError}>Throw Error</button> */}
      </div>
    );
  }
}

export default App;
