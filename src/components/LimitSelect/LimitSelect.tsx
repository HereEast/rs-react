import { ChangeEvent, ReactElement, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { setLocalStorage, getSearchParam } from "../../utils";
import { RANGE_OPTIONS, MIN_PAGE, INIT_PARAMS } from "../../constants";
import { saveLimit } from "../../store/limit/slice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import styles from "./limitSelect.module.scss";

function LimitSelect(): ReactElement {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.pokemon);

  const [searchParams, setSearchParams] = useSearchParams(INIT_PARAMS);

  const limit = getSearchParam(searchParams, "limit");

  useEffect(() => {
    dispatch(saveLimit({ limit }));
  }, [limit, dispatch]);

  function handleSetLimit(e: ChangeEvent<HTMLSelectElement>): void {
    const selectedOption = e.target.value;

    dispatch(saveLimit({ limit: selectedOption }));

    setSearchParams({ limit: selectedOption, page: MIN_PAGE });
    setLocalStorage("searchString", "");
  }

  return (
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
  );
}

export default LimitSelect;
