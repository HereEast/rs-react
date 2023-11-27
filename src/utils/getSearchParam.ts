import { LIMIT, MIN_PAGE } from "../constants";

type SearchParamKey = "page" | "limit";

export function getSearchParam(searchParams: URLSearchParams, key: SearchParamKey): string {
  if (key === "page") {
    return parseInt(searchParams.get("page") || MIN_PAGE, 10).toString();
  }
  return parseInt(searchParams.get("limit") || LIMIT, 10).toString();
}
