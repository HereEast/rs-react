import { useContext, Dispatch } from "react";
import { DetailsContext } from "../context";

interface IDetailsContext {
  selectedItem: string | null;
  setSelectedItem: Dispatch<React.SetStateAction<string | null>>;
}

export function useDetailsContext(): IDetailsContext {
  const context = useContext(DetailsContext);

  if (!context) {
    throw Error("Context error.");
  }

  return { selectedItem: context.selectedItem, setSelectedItem: context.setSelectedItem };
}
