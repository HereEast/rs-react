import { createContext, Dispatch, ReactElement, ReactNode, useState } from "react";
// import { IPokemonData } from "../types/types";

interface AppContextProps {
  selectedItem: string;
  setSelectedItem: Dispatch<React.SetStateAction<string>>;
}

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppContextProvider({ children }: AppContextProviderProps): ReactElement {
  const [selectedItem, setSelectedItem] = useState<string>("");

  return <AppContext.Provider value={{ selectedItem, setSelectedItem }}>{children}</AppContext.Provider>;
}
