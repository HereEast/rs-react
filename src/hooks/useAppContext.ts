import { useContext, Dispatch } from "react";
import { AppContext } from "../context";
import { IPokemonData } from "../types/types";

interface IAppContext {
  selectedItem: string;
  searchString: string;
  searchResults: IPokemonData[] | undefined;
  setSelectedItem: Dispatch<React.SetStateAction<string>>;
  setSearchString: Dispatch<React.SetStateAction<string>>;
  setSearchResults: Dispatch<React.SetStateAction<IPokemonData[] | undefined>>;
}

export function useAppContext(): IAppContext {
  const context = useContext(AppContext);

  if (!context) {
    throw Error("Context error.");
  }

  return context;
}
