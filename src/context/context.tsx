import { createContext, Dispatch, ReactElement, ReactNode, useState } from "react";
import { IPokemonData } from "../types/types";

interface AppContextProps {
  selectedItem: string | null;
  searchString: string;
  searchResults: IPokemonData[] | undefined;
  setSelectedItem: Dispatch<React.SetStateAction<string | null>>;
  setSearchString: Dispatch<React.SetStateAction<string>>;
  setSearchResults: Dispatch<React.SetStateAction<IPokemonData[] | undefined>>;
}

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppContextProvider({ children }: AppContextProviderProps): ReactElement {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState<IPokemonData[] | undefined>(undefined);

  return (
    <AppContext.Provider
      value={{ selectedItem, setSelectedItem, searchString, setSearchString, searchResults, setSearchResults }}
    >
      {children}
    </AppContext.Provider>
  );
}
