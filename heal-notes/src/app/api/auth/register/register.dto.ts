import * as Yup from "yup";

export const userRegistrationSchema: Yup.Schema<UserRegistration> =
  Yup.object().shape({
    username: Yup.string()
      .required("Name is required")
      .min(4, "Name must be at least 4 characters")
      .max(15, "Name must be less than 16 characters"),
    name: Yup.string().required("name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters")
      .max(15, "Password must be less than 16 characters"),
    secondname: Yup.string().optional(),
  });

export type UserRegistration = {
  username: string;
  name: string;
  secondname?: string;
  password: string;
};
