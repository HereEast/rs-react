import { ChangeEvent, ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { setLocalStorage } from "../../utils";
import { RANGE_OPTIONS, MIN_PAGE } from "../../constants";
import { saveLimit } from "../../store/limit/slice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import styles from "./limitSelect.module.scss";

function LimitSelect(): ReactElement {
  const { isLoading } = useAppSelector((state) => state.pokemon);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const limit = router.query.limit as string;

  useEffect(() => {
    dispatch(saveLimit({ limit: limit }));
  }, [limit, dispatch]);

  function handleSetLimit(e: ChangeEvent<HTMLSelectElement>): void {
    const selectedOption = e.target.value;

    dispatch(saveLimit({ limit: selectedOption }));

    router.push({
      pathname: "/",
      query: {
        limit: selectedOption,
        page: MIN_PAGE,
      },
    });

    setLocalStorage("searchString", "");
  }

  return (
    <div className={styles.pagination__select}>
      <label className={styles.label}>Items:</label>
      <select
        className={styles.select}
        // defaultValue={limit}
        onChange={(e): void => handleSetLimit(e)}
        disabled={isLoading}
        value={limit}
      >
        {RANGE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LimitSelect;
