import { LIMIT, MIN_COUNT } from "../constants";

type SearchParamKey = "page" | "limit";

export function getSearchParam(searchParams: URLSearchParams, key: SearchParamKey): string {
  if (key === "page") {
    return parseInt(searchParams.get("offset") || MIN_COUNT, 10).toString();
  }
  return parseInt(searchParams.get("limit") || LIMIT, 10).toString();
}
