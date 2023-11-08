import { ChangeEvent, MouseEvent, ReactElement } from "react";
import { Button } from "../Button";
import { countMaxPages } from "../../utils";
import { RANGE_OPTIONS, MIN_COUNT } from "../../constants";

import styles from "./pagination.module.scss";

interface PaginationProps {
  isLoading: boolean;
  page: string;
  limit: string;
  setPage: (page: string) => void;
  setLimit: (page: string) => void;
}

function Pagination({ isLoading, page, limit, setPage, setLimit }: PaginationProps): ReactElement {
  const MAX_PAGES = countMaxPages(limit);

  function handleChangePage(e: MouseEvent<HTMLButtonElement>): void {
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }

    const isPrevButton = e.target.classList.contains("prev");

    if (isPrevButton) {
      const newPage = Number(page) - 1;
      setPage(String(newPage));
    } else {
      const newPage = Number(page) + 1;
      setPage(String(newPage));
    }
  }

  function handleSetLimit(e: ChangeEvent<HTMLSelectElement>): void {
    const selectedOption = e.target.value;

    if (limit === selectedOption) {
      return;
    }

    setLimit(selectedOption);
    setPage("1");
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__buttons}>
        <label className={styles.label}>
          Page:
          <span>
            {page} / {MAX_PAGES}
          </span>
        </label>
        <Button
          name="Prev"
          className="prev"
          onClick={(e): void => handleChangePage(e)}
          disabled={page === MIN_COUNT || isLoading}
        />
        <Button
          name="Next"
          className="next"
          onClick={(e): void => handleChangePage(e)}
          disabled={page === MAX_PAGES || isLoading}
        />
      </div>
      <div className={styles.pagination__select}>
        <label className={styles.label}>Items:</label>
        <select
          className={styles.select}
          defaultValue={limit}
          onChange={(e): void => handleSetLimit(e)}
          disabled={isLoading}
        >
          {RANGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Pagination;
