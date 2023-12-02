export interface IFormDataInit {
  name: string | undefined;
  age: string | undefined;
  email: string | undefined;
  country: string | undefined;
  checkbox: boolean | undefined;
  password: string | undefined;
  passwordRepeat: string | undefined;
  file: File | undefined;
  gender: string | undefined;
}

export interface IFormData {
  name: string;
  age: string;
  email: string;
  password: string;
  country: string;
  gender: string;
  file: {
    fileName: string;
    fileSize: number;
    fileBase?: string;
  };
}

export interface IErrorsObject {
  [key: string]: string[];
}
