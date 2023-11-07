import { ChangeEvent, MouseEvent, ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../Button";
import { countMaxPages } from "../../utils";
import { LIMIT, INIT_PARAMS, RANGE_OPTIONS, MIN_COUNT } from "../../constants";

import styles from "./pagination.module.scss";

interface PaginationProps {
  isLoading: boolean;
}

function Pagination({ isLoading }: PaginationProps): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams(INIT_PARAMS);

  const page = searchParams.get("offset") || MIN_COUNT;
  const limit = searchParams.get("limit") || LIMIT;
  const MAX_PAGES = countMaxPages(limit);

  function handleChangePage(e: MouseEvent<HTMLButtonElement>): void {
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }

    const isPrevButton = e.target.classList.contains("prev");

    if (isPrevButton) {
      const newPage = Number(page) - 1;
      setSearchParams({ limit: limit, offset: String(newPage) });
    } else {
      const newPage = Number(page) + 1;
      setSearchParams({ limit: limit, offset: String(newPage) });
    }
  }

  function handleSetLimit(e: ChangeEvent<HTMLSelectElement>): void {
    const selectedOption = e.target.value;

    if (limit === selectedOption) {
      return;
    }

    setSearchParams({ limit: selectedOption, offset: MIN_COUNT });
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
