import { createContext, Dispatch, ReactElement, ReactNode, useState } from "react";

interface DetailsContext {
  selectedItem: string | null;
  setSelectedItem: Dispatch<React.SetStateAction<string | null>>;
}

type DetailsProviderProps = {
  children: ReactNode;
};

export const DetailsContext = createContext<DetailsContext | undefined>(undefined);

export function DetailsProvider({ children }: DetailsProviderProps): ReactElement {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return <DetailsContext.Provider value={{ selectedItem, setSelectedItem }}>{children}</DetailsContext.Provider>;
}
