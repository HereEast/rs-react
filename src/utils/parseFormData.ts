import { IFormDataInit, IFormData } from "../types";

export function parseFormData(formData: IFormDataInit): IFormData {
  const parsedData = {
    name: formData.name || "",
    age: formData.age || "",
    email: formData.email || "",
    country: formData.country || "",
    password: formData.password || "",
    gender: formData.gender || "",
    file: {
      fileName: formData.file?.name || "",
      fileSize: formData.file?.size || 0,
    },
  };

  return parsedData;
}
