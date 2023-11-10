export function setLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function getLocalStorage(key: string): string {
  const value = localStorage.getItem(key) || "";
  return value;
}
