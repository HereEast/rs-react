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
    const savedSearchTerm = localStorage.getItem("searchString");
    if (savedSearchTerm) {
      this.setState({ searchString: savedSearchTerm });
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchString: e.target.value.toLowerCase().trim() });
  };

  handleSearch = (): void => {
    const { searchString } = this.state;
    this.props.onSearch(searchString);
    localStorage.setItem("searchString", searchString);

    this.setState({ searchString: "" });
  };

  render(): ReactElement {
    const { searchString } = this.state;

    return (
      <div className="search">
        <input type="text" value={searchString} placeholder="Search Pokemon" onChange={this.handleInputChange} />

        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchInput;
