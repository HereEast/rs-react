import { MouseEvent, ReactElement, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../Button";
import { LimitSelect } from "../LimitSelect";
import { getSearchParam, getMaxPage, setLocalStorage } from "../../utils";
import { MIN_PAGE, INIT_PARAMS } from "../../constants";

import styles from "./pagination.module.scss";

interface PaginationProps {
  isLoading: boolean;
}

function Pagination({ isLoading }: PaginationProps): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams(INIT_PARAMS);
  const [maxPage, setMaxPage] = useState<string>("");

  const page = getSearchParam(searchParams, "page");
  const limit = getSearchParam(searchParams, "limit");

  useEffect(() => {
    async function handleMaxPage(): Promise<void> {
      const currentMaxPage = await getMaxPage(searchParams);
      if (currentMaxPage) {
        setMaxPage(currentMaxPage);
      }
    }
    handleMaxPage();
  }, [limit]);

  function handleChangePage(e: MouseEvent<HTMLButtonElement>): void {
    if (e.target instanceof HTMLButtonElement) {
      const isPrevButton = e.target.classList.contains("prev");

      if (isPrevButton) {
        const newPage = Number(page) - 1;
        setSearchParams({ limit: limit, page: String(newPage) });
      } else {
        const newPage = Number(page) + 1;
        setSearchParams({ limit: limit, page: String(newPage) });
      }
    }

    setLocalStorage("searchString", "");
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__buttons}>
        <label className={styles.label}>
          Page:
          <span>
            {page} / {maxPage}
          </span>
        </label>
        <Button
          name="Prev"
          className="prev"
          onClick={(e): void => handleChangePage(e)}
          disabled={page === MIN_PAGE || isLoading}
        />
        <Button
          name="Next"
          className="next"
          onClick={(e): void => handleChangePage(e)}
          disabled={page === maxPage || isLoading}
        />
      </div>
      <LimitSelect isLoading={isLoading} limit={limit} />
    </div>
  );
}

export default Pagination;
