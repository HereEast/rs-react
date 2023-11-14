import { ChangeEvent, ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { setLocalStorage } from "../../utils";
import { RANGE_OPTIONS, MIN_PAGE, INIT_PARAMS } from "../../constants";

import styles from "./limitSelect.module.scss";

interface LimitSelectProps {
  isLoading: boolean;
  limit: string;
}

function LimitSelect({ isLoading, limit }: LimitSelectProps): ReactElement {
  const [, setSearchParams] = useSearchParams(INIT_PARAMS);

  function handleSetLimit(e: ChangeEvent<HTMLSelectElement>): void {
    const selectedOption = e.target.value;

    if (limit === selectedOption) {
      return;
    }

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
