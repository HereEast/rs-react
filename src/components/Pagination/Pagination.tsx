import { ChangeEvent, ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../Button";
import { LIMIT, MAX_COUNT, INIT_PARAMS, RANGE_OPTIONS } from "../../constants";

import classnames from "classnames";
import styles from "./pagination.module.scss";

interface PaginationProps {
  isLoading: boolean;
}

function Pagination({ isLoading }: PaginationProps): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams(INIT_PARAMS);

  const page = searchParams.get("offset") || "1";
  const limit = searchParams.get("limit") || LIMIT;

  function handleChangePage(page: number): void {
    setSearchParams({ limit: limit, offset: String(page) });
  }

  function handleSetLimit(e: ChangeEvent<HTMLSelectElement>): void {
    const selectedOption = e.target.value;

    if (limit === selectedOption) {
      return;
    }

    setSearchParams({ limit: selectedOption, offset: "1" });
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__buttons}>
        {new Array(Math.ceil(Number(MAX_COUNT) / Number(limit))).fill(1).map((_: number, index) => (
          <Button
            key={index}
            name={index + 1}
            className={classnames(
              styles.pagination__button,
              page === String(index + 1) ? styles.pagination__button_active : "",
            )}
            onClick={(): void => handleChangePage(index + 1)}
            disabled={isLoading || page === String(index + 1)}
          />
        ))}
      </div>
      <div className={styles.pagination__select}>
        <label className={styles.label}>Items:</label>
        <select className={styles.select} defaultValue={limit} onChange={(e): void => handleSetLimit(e)}>
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
