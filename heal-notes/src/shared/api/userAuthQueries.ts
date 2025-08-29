import { UserJWT, UserLogin, UserRegistration } from "@/types/user";
import { postData } from "../queriesMethods";
import { ERROR } from "@/types/error";

export const fetchUserRegistration = async (data: UserRegistration) => {
  try {
    const response = await postData<UserJWT>("auth/register", data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchUserLogin = async (data: UserLogin) => {
  try {
    const response = await postData<UserJWT>("auth/login", data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
