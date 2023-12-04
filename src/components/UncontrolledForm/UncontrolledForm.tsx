import { FormEvent, ReactElement, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
import {
  validationSchema,
  initErrors,
  parseFormData,
  checkInputsFilled,
} from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { saveFormData, saveFileBase } from "../../store/form";
import { IErrorsObject, IFormDataInit } from "../../types";

import * as Yup from "yup";

import classnames from "classnames";
import styles from "./uncontrolledForm.module.scss";

function UncontrolledForm(): ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const countriesList = useAppSelector((state) => state.countries);

  const [errors, setErrors] = useState<IErrorsObject>(initErrors);
  const [isDisabled, setIsDisabled] = useState(true);

  const inputRef = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    country: useRef<HTMLInputElement>(null),
    checkbox: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    passwordRepeat: useRef<HTMLInputElement>(null),
    file: useRef<HTMLInputElement>(null),
    genderMale: useRef<HTMLInputElement>(null),
    genderFemale: useRef<HTMLInputElement>(null),
  };

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();

    const imageFile = inputRef.file.current?.files?.[0];

    const formData: IFormDataInit = {
      name: inputRef.name.current?.value.trim(),
      age: inputRef.age.current?.value.trim(),
      email: inputRef.email.current?.value.trim(),
      country: inputRef.country.current?.value.trim(),
      checkbox: inputRef.checkbox.current?.checked,
      password: inputRef.password.current?.value.trim(),
      passwordRepeat: inputRef.passwordRepeat.current?.value.trim(),
      file: imageFile,
      gender: inputRef.genderFemale.current?.checked
        ? inputRef.genderFemale.current?.value
        : inputRef.genderMale.current?.value,
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // Image base
      if (imageFile) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          dispatch(saveFileBase(reader.result));
        });

        reader.readAsDataURL(imageFile);
      }

      const data = parseFormData(formData);
      dispatch(saveFormData(data));

      navigate("/");

      // Here valid form
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

  function handleButtonDisabled(): void {
    if (checkInputsFilled(inputRef)) {
      setIsDisabled(false);
    }
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.nav__link}>
        Home
      </Link>
      <h1 className={styles.title}>Uncontrolled Form</h1>

      <form className={styles.form} onChange={handleButtonDisabled}>
        {/* Name */}
        <div className={styles.container__name}>
          <label htmlFor="name" className={styles.label}>
            Name
            <input
              type="text"
              name="name"
              className={styles.input}
              ref={inputRef.name}
            />
          </label>

          {errors.name.length > 0 && <ErrorMessage message={errors.name[0]} />}
        </div>

        {/* Age */}
        <div className={styles.container__age}>
          <label htmlFor="age" className={styles.label}>
            Age
            <input
              type="text"
              name="age"
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
              list="countries"
              className={styles.input}
              ref={inputRef.country}
            />
          </label>

          <datalist id="countries">
            {countriesList.map((option, idx) => (
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
                className={styles.input}
                ref={inputRef.password}
              />
            </label>

            <label htmlFor="passwordRepeat" className={styles.label}>
              Repeat Password
              <input
                type="text"
                name="passwordRepeat"
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
              value="male"
              className={styles.input}
              ref={inputRef.genderMale}
            />
          </label>

          <label htmlFor="gender" className={styles.label}>
            Female
            <input
              type="radio"
              name="gender"
              value="female"
              defaultChecked
              className={styles.input}
              ref={inputRef.genderFemale}
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
                className={classnames(styles.input, styles.input__file)}
                accept="image/png, image/jpeg"
                multiple={false}
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
          disabled={isDisabled}
        />
      </form>
    </div>
  );
}

export default UncontrolledForm;
