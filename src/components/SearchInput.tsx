import { ChangeEvent, Component, ReactElement } from "react";

interface SearchInputProps {
  onSearch: (searchString: string) => void;
}

interface SearchInputState {
  searchString: string;
}

class SearchInput extends Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);
    this.state = {
      searchString: "",
    };
  }

  componentDidMount(): void {
    const savedSearchString = localStorage.getItem("searchString");
    if (savedSearchString) {
      this.setState({ searchString: savedSearchString });
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchString: e.target.value.toLowerCase().trim() });
  };

  handleSearch = (): void => {
    const { searchString } = this.state;

    this.props.onSearch(searchString);
    localStorage.setItem("searchString", searchString);
  };

  render(): ReactElement {
    const { searchString } = this.state;

    return (
      <div className="search">
        <input
          className="search__input"
          type="text"
          value={searchString}
          placeholder="Search Pokemon"
          onChange={this.handleInputChange}
        />

        <button className="search__button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchInput;
