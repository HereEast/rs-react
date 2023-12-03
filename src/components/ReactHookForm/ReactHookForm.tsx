import { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { saveFormData, saveFileBase } from "../../store/form";
import { validationSchema, parseFormData } from "../../utils";
import { IFormDataInit } from "../../types";

import classnames from "classnames";
import styles from "./reactHookForm.module.scss";

function ReactHookForm(): ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const countriesList = useAppSelector((state) => state.countries);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  function onSubmit(data: IFormDataInit): void {
    if (data.file && Array.isArray(data.file) && data.file[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        dispatch(saveFileBase(reader.result));
      });

      reader.readAsDataURL(data.file[0]);
    }

    const parsedData = parseFormData(data);
    dispatch(saveFormData(parsedData));

    navigate("/");
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.nav__link}>
        Home
      </Link>
      <h1 className={styles.title}>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Name */}
        <div className={styles.container__name}>
          <label htmlFor="name" className={styles.label}>
            Name
            <input {...register("name")} type="text" className={styles.input} />
          </label>

          {errors?.name && (
            <ErrorMessage message={errors?.name.message as string} />
          )}
        </div>

        {/* Age */}
        <div className={styles.container__age}>
          <label htmlFor="age" className={styles.label}>
            Age
            <input {...register("age")} type="text" className={styles.input} />
          </label>

          {errors?.age && (
            <ErrorMessage message={errors?.age.message as string} />
          )}
        </div>

        {/* Country */}
        <div className={styles.container__country}>
          <label htmlFor="country" className={styles.label}>
            Country
            <input
              {...register("country")}
              type="text"
              list="countries"
              className={styles.input}
            />
          </label>

          <datalist id="countries">
            {countriesList.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </datalist>

          {errors?.country && (
            <ErrorMessage message={errors?.country.message as string} />
          )}
        </div>

        {/* Email */}
        <div className={styles.container__email}>
          <label htmlFor="age" className={styles.label}>
            Email
            <input
              {...register("email")}
              type="text"
              className={styles.input}
            />
          </label>

          {errors?.email && (
            <ErrorMessage message={errors?.email.message as string} />
          )}
        </div>

        {/* Password */}
        <div className={styles.container__password}>
          <div className={styles.fields}>
            <label htmlFor="password" className={styles.label}>
              Password
              <input
                {...register("password")}
                type="text"
                className={styles.input}
              />
            </label>

            <label htmlFor="passwordRepeat" className={styles.label}>
              Repeat Password
              <input
                {...register("passwordRepeat")}
                type="text"
                className={styles.input}
              />
            </label>
          </div>

          {errors?.password && (
            <ErrorMessage message={errors.password.message as string} />
          )}

          {!errors.password && errors.passwordRepeat && (
            <ErrorMessage message={errors.passwordRepeat.message as string} />
          )}
        </div>

        {/* Gender */}
        <div className={styles.container__radio}>
          <label htmlFor="gender" className={styles.label}>
            Male
            <input
              {...register("gender")}
              type="radio"
              value="male"
              className={styles.input}
            />
          </label>

          <label htmlFor="gender" className={styles.label}>
            Female
            <input
              type="radio"
              {...register("gender")}
              value="female"
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
                {...register("file")}
                type="file"
                className={classnames(styles.input, styles.input__file)}
                accept="image/png, image/jpeg"
                multiple={false}
              />
            </label>
          </div>

          {errors?.file && (
            <ErrorMessage message={errors.file.message as string} />
          )}
        </div>

        {/* Checkbox */}
        <div className={styles.container__checkbox}>
          <label htmlFor="checkbox" className={styles.label}>
            Agree with Terms & Conditions.
            <input
              {...register("checkbox")}
              type="checkbox"
              className={classnames(styles.input, styles.input__checkbox)}
            />
          </label>

          {errors.checkbox && (
            <ErrorMessage message={errors.checkbox.message as string} />
          )}
        </div>

        <Button
          type="submit"
          name="Submit Form"
          className={styles.button__submit}
          disabled={!isValid}
        />
      </form>
    </div>
  );
}

export default ReactHookForm;
