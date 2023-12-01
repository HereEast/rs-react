import { FormEvent, ReactElement, useRef, useState } from "react";
import { Button } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
import { Input } from "../Input";
import { validationSchema, initErrors, COUNTRIES } from "../../utils";

import * as Yup from "yup";

import classnames from "classnames";
import styles from "./uncontrolledForm.module.scss";

// store data in redux store >>> show on Home after successful submit
// autocomplete control to select country (all countries should be stored in the Redux store)

function UncontrolledForm(): ReactElement {
  const inputRef = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    country: useRef<HTMLInputElement>(null),
    checkbox: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    passwordRepeat: useRef<HTMLInputElement>(null),
    file: useRef<HTMLInputElement>(null),
  };

  const [errors, setErrors] = useState(initErrors);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();

    const formData = {
      name: inputRef.name.current?.value.trim(),
      age: inputRef.age.current?.value.trim(),
      email: inputRef.email.current?.value.trim(),
      country: inputRef.country.current?.value.trim(),
      checkbox: inputRef.checkbox.current?.checked,
      password: inputRef.password.current?.value.trim(),
      passwordRepeat: inputRef.passwordRepeat.current?.value.trim(),
      file: inputRef.file.current?.files?.[0],
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const currentErrors = JSON.parse(JSON.stringify(initErrors));

        err.inner.forEach((e) => {
          if (e.path && currentErrors[e.path]) {
            currentErrors[e.path].push(e.message);
          }
        });

        setErrors(currentErrors);
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Uncontrolled Form</h1>

      <form className={styles.form} noValidate>
        {/* Name */}
        <div className={styles.container__name}>
          <Input type="text" name="name" label="Name" ref={inputRef.name} />
          {/* <label htmlFor="name" className={styles.label}>
            Name
            <input
              type="text"
              name="name"
              id="name"
              className={styles.input}
              ref={inputRef.name}
            />
          </label> */}

          {errors.name.length > 0 && <ErrorMessage message={errors.name[0]} />}
        </div>

        {/* Age */}
        <div className={styles.container__age}>
          <label htmlFor="age" className={styles.label}>
            Age
            <input
              type="text"
              name="age"
              id="age"
              className={styles.input}
              ref={inputRef.age}
            />
          </label>

          {errors.age.length > 0 && <ErrorMessage message={errors.age[0]} />}
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
              ref={inputRef.country}
            />
          </label>

          <datalist id="countries">
            {COUNTRIES.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </datalist>

          {errors.country.length > 0 && (
            <ErrorMessage message={errors.country[0]} />
          )}
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
              ref={inputRef.email}
            />
          </label>

          {errors.email.length > 0 && (
            <ErrorMessage message={errors.email[0]} />
          )}
        </div>

        {/* Password */}
        <div className={styles.container__password}>
          <div className={styles.fields}>
            <label htmlFor="password" className={styles.label}>
              Password
              <input
                type="text"
                name="password"
                id="password"
                className={styles.input}
                ref={inputRef.password}
              />
            </label>

            <label htmlFor="passwordRepeat" className={styles.label}>
              Repeat Password
              <input
                type="text"
                name="passwordRepeat"
                id="passwordRepeat"
                className={styles.input}
                ref={inputRef.passwordRepeat}
              />
            </label>
          </div>

          {errors.password.length > 0 && (
            <ErrorMessage message={errors.password[0]} />
          )}

          {!errors.password.length && errors.passwordRepeat.length > 0 && (
            <ErrorMessage message={errors.passwordRepeat[0]} />
          )}
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
          <div className={styles.control}>
            <label htmlFor="file">
              <input
                type="file"
                name="file"
                id="file"
                className={classnames(styles.input, styles.input__file)}
                accept="image/png, image/jpeg"
                ref={inputRef.file}
              />
            </label>
          </div>

          {errors.file.length > 0 && <ErrorMessage message={errors.file[0]} />}
        </div>

        {/* Checkbox */}
        <div className={styles.container__checkbox}>
          <label htmlFor="checkbox" className={styles.label}>
            Agree with Terms & Conditions.
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              className={classnames(styles.input, styles.input__checkbox)}
              ref={inputRef.checkbox}
            />
          </label>

          {errors.checkbox.length > 0 && (
            <ErrorMessage message={errors.checkbox[0]} />
          )}
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
