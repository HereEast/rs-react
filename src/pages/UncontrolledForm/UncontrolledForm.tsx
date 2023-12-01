import { FormEvent, ReactElement, useRef } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import styles from "./uncontrolledForm.module.scss";
import classnames from "classnames";

const COUNTRIES = ["Argentina", "Brazil", "Morocco"];

// validate on submit
// validate w yup
// store data in redux store >>> show on Home after successful submit

// autocomplete control to select country (all countries should be stored in the Redux store)

function UncontrolledForm(): ReactElement {
  const nameInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    console.log(nameInputRef.current?.value);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Uncontrolled Form</h1>

      <form className={styles.form}>
        {/* Name */}
        <div className={styles.container__name}>
          <Input type="text" label="Name" name="name" ref={nameInputRef} />
          {/* <label htmlFor="name" className={styles.label}>
            Name
            <input
              type="text"
              name="name"
              id="name"
              className={styles.input}
              ref={nameInputRef}
            />
          </label> */}
        </div>

        {/* Age */}
        <div className={styles.container__age}>
          <label htmlFor="age" className={styles.label}>
            Age
            <input type="number" name="age" id="age" className={styles.input} />
          </label>
        </div>

        {/* Country */}
        <div className={styles.container__country}>
          <label htmlFor="country" className={styles.label}>
            Country
            <input
              type="text"
              name="country"
              id="country"
              list="countries"
              className={styles.input}
            />
          </label>

          <datalist id="countries">
            {COUNTRIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </datalist>
        </div>

        {/* Email */}
        <div className={styles.container__email}>
          <label htmlFor="email" className={styles.label}>
            Email
            <input
              type="email"
              name="email"
              id="email"
              className={styles.input}
            />
          </label>
        </div>

        {/* Password */}
        <div className={styles.container__password}>
          <label htmlFor="password" className={styles.label}>
            Password
            <input
              type="password"
              name="password"
              id="password"
              className={styles.input}
            />
          </label>

          <label htmlFor="password-repeat" className={styles.label}>
            Repeat Password
            <input
              type="password"
              name="password-repeat"
              id="password-repeat"
              className={styles.input}
            />
          </label>
        </div>

        {/* Gender */}
        <div className={styles.container__radio}>
          <label htmlFor="gender" className={styles.label}>
            Male
            <input
              type="radio"
              name="gender"
              id="gender-male"
              className={styles.input}
            />
          </label>

          <label htmlFor="gender" className={styles.label}>
            Female
            <input
              type="radio"
              name="gender"
              id="gender-female"
              defaultChecked
              className={styles.input}
            />
          </label>
        </div>

        {/* Image */}
        <div className={styles.container__file}>
          <label htmlFor="image-upload">
            <input
              type="file"
              name="image-upload"
              id="image-upload"
              className={classnames(styles.input, styles.input__file)}
              accept="image/png, image/jpeg"
            />
          </label>
        </div>

        {/* Checkbox */}
        <div className={styles.container__checkbox}>
          <label htmlFor="check" className={styles.label}>
            Agree with Terms & Conditions.
            <input
              type="checkbox"
              name="check"
              id="check"
              className={classnames(styles.input, styles.input__checkbox)}
            />
          </label>
        </div>

        <Button
          type="submit"
          name="Submit Form"
          className={styles.button__submit}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default UncontrolledForm;
