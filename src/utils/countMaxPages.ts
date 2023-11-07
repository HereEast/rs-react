import { MAX_COUNT } from "../constants";

export function countMaxPages(limit: string): string {
  return String(Math.ceil(Number(MAX_COUNT) / Number(limit)));
}
