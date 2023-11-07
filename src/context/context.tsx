import { createContext, Dispatch } from "react";

interface DetailsContext {
  selectedItem: string | null;
  setSelectedItem: Dispatch<React.SetStateAction<string | null>>;
}

const DetailsContext = createContext<DetailsContext | undefined>(undefined);

export default DetailsContext;
