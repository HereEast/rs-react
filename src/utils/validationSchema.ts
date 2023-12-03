import * as Yup from "yup";
import { COUNTRIES } from "./constants";

export const validationSchema = Yup.object({
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
  email: Yup.string()
    .required("Email is required.")
    .email("Please, enter a valid email."),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).+$/,
      "Password should contain at least 1 number, 1 uppercase letter, 1 lowercase letter, 1 special character",
    ),
  passwordRepeat: Yup.string()
    .required("Repeat password is required.")
    .test(
      "password-should-match",
      "Passwords must match. Try again.",
      function (value) {
        return this.parent.password === value;
      },
    ),
  file: Yup.mixed()
    .required("Image is required.")
    .test("fileSize", "File too large. Max 2Mb.", (value) => {
      if (value instanceof FileList) {
        return value && value[0]?.size <= 1024 * 1024 * 2;
      }

      if (value instanceof File) {
        return value && value.size <= 1024 * 1024 * 2;
      }
    })
    .test(
      "fileType",
      "Invalid file format. Please, choose jpg, jpeg or png.",
      (value) => {
        if (value instanceof FileList) {
          return ["image/jpeg", "image/png"].includes(value[0]?.type);
        }

        if (value instanceof File) {
          return ["image/jpeg", "image/png"].includes(value.type);
        }
      },
    ),
  checkbox: Yup.boolean().oneOf(
    [true],
    "You must agree to the Terms & Conditions.",
  ),
  gender: Yup.string().required("Gender is required."),
});
