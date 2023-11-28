import { MouseEvent, ReactElement, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Button } from "../Button";
import { LimitSelect } from "../LimitSelect";
import { getMaxPage, setLocalStorage } from "../../utils";
import { useAppSelector } from "../../store/store";
import { MIN_PAGE } from "../../constants";

import styles from "./pagination.module.scss";

function Pagination(): ReactElement {
  const { isLoading } = useAppSelector((state) => state.pokemon);

  const router = useRouter();
  const searchParams = useSearchParams();

  const limit = router.query.limit as string;
  const page = router.query.page as string;

  const [maxPage, setMaxPage] = useState<string>("");

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
        router.push({
          pathname: "/",
          query: { limit, page: newPage },
        });
      } else {
        const newPage = Number(page) + 1;
        router.push({
          pathname: "/",
          query: { limit, page: newPage },
        });
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
      <LimitSelect />
    </div>
  );
}

export default Pagination;
