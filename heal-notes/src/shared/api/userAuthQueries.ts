import { UserJWT, UserRegistration } from "@/types/user";
import { postData } from "../baseQueries";

export const fetchUserRegistration = async (data: UserRegistration) => {
  try {
    const response = await postData<UserJWT>("auth/register", data);
  } catch (error) {
    console.log(error);
  }
};
