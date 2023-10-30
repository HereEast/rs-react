import { Component, ReactElement } from "react";
import SearchInput from "./SearchInput";
import ResultItem from "./ResultItem";
import { IPokemonData, IPokemonBasicData } from "../types/types";

interface AppState {
  searchResults: IPokemonData[];
  isLoading: boolean;
  error: string;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchResults: [],
      isLoading: false,
      error: "",
    };
  }

  componentDidMount(): void {
    const savedSearchString = localStorage.getItem("searchString") || "";
    this.fetchResults(savedSearchString);
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

  async getAllPokemons(dataArray: IPokemonBasicData[]): Promise<IPokemonData[]> {
    const pokemonDataPromises = dataArray.map(async (data) => {
      const response = await this.getPokemon(data.name);
      return response;
    });

    const pokemonData = await Promise.all(pokemonDataPromises);
    return pokemonData;
  }

  async fetchResults(searchString: string): Promise<void> {
    this.setState({ isLoading: true });
    this.setState({ error: "" });

    const URL = searchString
      ? `https://pokeapi.co/api/v2/pokemon/${searchString}`
      : "https://pokeapi.co/api/v2/pokemon?limit=300";

    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw Error("Pokemon not found. Try another one!");
      }

      const data = await response.json();

      if (searchString) {
        const pokemonData = await this.getPokemon(searchString);
        this.setState({ searchResults: [pokemonData] });
      } else {
        const pokemonData = await this.getAllPokemons(data.results);
        this.setState({ searchResults: pokemonData });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        this.setState({ error: error.message });
      }
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSearch = (searchString: string): void => {
    this.fetchResults(searchString);
  };

  handleThrowError = (): void => {
    try {
      throw new Error("Test error is thrown!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        this.setState({ error: error.message });
      }
    }
  };

  render(): ReactElement {
    const { searchResults } = this.state;

    return (
      <div className="page">
        <span className="note">The total number of Pokémon is limited to 300 due to practical considerations.</span>

        <header className="header">
          <SearchInput onSearch={this.handleSearch} isLoading={this.state.isLoading} />
          <button className="button button__error" disabled={this.state.isLoading} onClick={this.handleThrowError}>
            Throw Error ⚡️
          </button>
        </header>

        {this.state.error && (
          <div className="message">
            <span className="message__error">{this.state.error}</span>
          </div>
        )}

        {this.state.isLoading && (
          <div className="message">
            <span className="message__loading">Loading...</span>
          </div>
        )}

        {!this.state.error && !this.state.isLoading && (
          <div className="results">
            {searchResults.length > 0 &&
              searchResults.map((data) => (
                <ResultItem
                  key={data.id}
                  name={data.name}
                  height={data.height}
                  weight={data.weight}
                  image={data.image}
                />
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;
