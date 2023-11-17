import { getSearchParam } from "./getSearchParam";
import { BASE_URL } from "../constants";

export async function getMaxPage(searchParams: URLSearchParams): Promise<string | undefined> {
  const limit = getSearchParam(searchParams, "limit");

  const response = await fetch(BASE_URL);
  const data = await response.json();

  const currentMaxPage = String(Math.ceil(Number(data.count) / Number(limit)));
  return currentMaxPage;
}
