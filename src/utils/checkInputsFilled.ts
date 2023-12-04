import { IInputRefs } from "../types";

export function checkInputsFilled(inputRef: IInputRefs): boolean {
  const isName = inputRef.name.current?.value.trim();
  const isAge = inputRef.age.current?.value.trim();
  const isEmail = inputRef.email.current?.value.trim();
  const isCountry = inputRef.country.current?.value.trim();
  const isPassword = inputRef.password.current?.value.trim();
  const isPasswordRepeat = inputRef.passwordRepeat.current?.value.trim();
  const isCheckbox = inputRef.checkbox.current?.checked;
  const isFile = inputRef.file.current?.files?.[0];

  if (
    isName &&
    isAge &&
    isEmail &&
    isCountry &&
    isPassword &&
    isPasswordRepeat &&
    isCheckbox &&
    isFile
  ) {
    return true;
  } else {
    return false;
  }
}
