import { useState } from "react";
import { BASE_URL, LIMIT } from "../constants";

interface IUseMaxPage {
  maxPage: string;
  getMaxPage: (searchParams: URLSearchParams) => Promise<void>;
}

export function useMaxPage(): IUseMaxPage {
  const [maxPage, setMaxPage] = useState("");

  async function getMaxPage(searchParams: URLSearchParams): Promise<void> {
    const limit = searchParams.get("limit")?.toString() || LIMIT;

    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();

      const currentMaxPage = String(Math.ceil(Number(data.count) / Number(limit)));
      setMaxPage(currentMaxPage);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  return { maxPage, getMaxPage };
}
