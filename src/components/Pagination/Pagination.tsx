import { ReactElement } from "react";
import { Button } from "../Button";
import { MAX_COUNT, PAGE_ITEMS } from "../../constants";

import classnames from "classnames";
import styles from "./pagination.module.scss";

interface PaginationProps {
  limit: string;
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

function Pagination({ page, limit, setPage, setLimit, isLoading }: PaginationProps): ReactElement {
  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__buttons}>
        {new Array(Math.ceil(Number(MAX_COUNT) / Number(limit))).fill(1).map((_: number, index) => (
          <Button
            key={index}
            title={index + 1}
            className={classnames(
              styles.pagination__button,
              page === String(index + 1) ? styles.pagination__button_active : "",
            )}
            onClick={(): void => setPage(String(index + 1))}
            disabled={isLoading || page === String(index + 1)}
          />
        ))}
      </div>
      <div className={styles.pagination__select}>
        <span className={styles.label}>Items:</span>
        <select
          className={styles.select}
          defaultValue={limit}
          onChange={(e): void => setLimit(e.target.value)}
          disabled={isLoading}
        >
          {PAGE_ITEMS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Pagination;
