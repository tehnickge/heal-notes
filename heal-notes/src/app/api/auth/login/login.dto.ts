import { UserLogin } from "@/types/user";
import * as Yup from "yup";

export const userLoginSchema: Yup.Schema<UserLogin> =
  Yup.object().shape({
    username: Yup.string()
      .required("Name is required")
      .min(4, "Name must be at least 4 characters")
      .max(15, "Name must be less than 16 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters")
      .max(15, "Password must be less than 16 characters"),
  });
