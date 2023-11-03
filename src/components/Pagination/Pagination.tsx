import { ReactElement } from "react";
import { Button } from "../Button";
import { MAX_COUNT } from "../../constants";

import classnames from "classnames";
import styles from "./pagination.module.scss";

const selectOptions = [2, 3, 4, 5, 6];

interface PaginationProps {
  limit: string;
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
}

function Pagination({ page, limit, setPage, setLimit }: PaginationProps): ReactElement {
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
            disabled={page === String(index + 1)}
          />
        ))}
      </div>
      <div className={styles.pagination__select}>
        <span className={styles.label}>Items:</span>
        <select className={styles.select} defaultValue={limit} onChange={(e): void => setLimit(e.target.value)}>
          {selectOptions.map((value) => (
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
