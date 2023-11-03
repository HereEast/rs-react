import { ReactElement } from "react";
import { Button } from "../Button";
import { MAX_COUNT } from "../../constants";

import classnames from "classnames";
import styles from "./pagination.module.scss";

interface PaginationProps {
  limit: string;
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

function Pagination({ page, setPage, limit }: PaginationProps): ReactElement {
  return (
    <div className={styles.pagination}>
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
  );
}

export default Pagination;
