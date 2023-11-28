import { useContext, Dispatch } from "react";
import { AppContext } from "../context";

interface IAppContext {
  selectedItem: string;
  setSelectedItem: Dispatch<React.SetStateAction<string>>;
}

export function useAppContext(): IAppContext {
  const context = useContext(AppContext);

  if (!context) {
    throw Error("Context error.");
  }

  return context;
}
