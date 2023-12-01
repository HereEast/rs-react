import { FormEvent, ReactElement, useRef, useState } from "react";
import { Button } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
// import { Input } from "../../components/Input";
import { COUNTRIES } from "../../utils/constants";

import * as Yup from "yup";

import classnames from "classnames";
import styles from "./uncontrolledForm.module.scss";

// validate on submit
// store data in redux store >>> show on Home after successful submit

// autocomplete control to select country (all countries should be stored in the Redux store)

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .matches(/^[A-Z].*$/, "Name should start with an uppercase letter."),
  age: Yup.string()
    .required("Age is required.")
    .matches(/^[1-9]\d*$/, "Age should be a positive number."),
  country: Yup.string()
    .required("Country is required.")
    .test(
      "isValidCountry",
      "Please, select a country from the list.",
      (value) => {
        return !value || COUNTRIES.includes(value);
      },
    ),
  // .oneOf(COUNTRIES, "Please, select a country from the list."),
  email: Yup.string()
    .required("Email is required.")
    .email("Please, enter a valid email."),
});

function UncontrolledForm(): ReactElement {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);

  const [nameError, setNameError] = useState<string[]>([]);
  const [ageError, setAgeError] = useState<string[]>([]);
  const [countryError, setCountryError] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();

    try {
      await validationSchema.validate(
        {
          name: nameInputRef.current?.value.trim(),
          age: ageInputRef.current?.value.trim(),
          email: emailInputRef.current?.value.trim(),
          country: countryInputRef.current?.value.trim(),
        },
        { abortEarly: false },
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const currentNameErrors: string[] = [];
        const currentAgeErrors: string[] = [];
        const currentEmailErrors: string[] = [];
        const currentCountryErrors: string[] = [];

        err.inner.forEach((e) => {
          // console.log(e.path, e.message);

          if (e.path && e.path === "name") {
            currentNameErrors.push(e.message);
          }

          if (e.path && e.path === "age") {
            currentAgeErrors.push(e.message);
          }

          if (e.path && e.path === "country") {
            currentCountryErrors.push(e.message);
          }

          if (e.path && e.path === "email") {
            currentEmailErrors.push(e.message);
          }
        });

        setNameError(currentNameErrors);
        setAgeError(currentAgeErrors);
        setCountryError(currentCountryErrors);
        setEmailError(currentEmailErrors);
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Uncontrolled Form</h1>

      <form className={styles.form} noValidate>
        {/* Name */}
        <div className={styles.container__name}>
          {/* <Input type="text" label="Name" name="name" ref={nameInputRef} /> */}
          <label htmlFor="name" className={styles.label}>
            Name
            <input
              type="text"
              name="name"
              id="name"
              className={styles.input}
              ref={nameInputRef}
            />
          </label>
          {nameError.length > 0 && <ErrorMessage message={nameError[0]} />}
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
              ref={ageInputRef}
            />
          </label>
          {ageError.length > 0 && <ErrorMessage message={ageError[0]} />}
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
              ref={countryInputRef}
            />
          </label>

          <datalist id="countries">
            {COUNTRIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </datalist>

          {countryError.length > 0 && (
            <ErrorMessage message={countryError[0]} />
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
              ref={emailInputRef}
            />
          </label>
          {emailError.length > 0 && <ErrorMessage message={emailError[0]} />}
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
