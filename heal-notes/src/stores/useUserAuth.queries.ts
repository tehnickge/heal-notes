import { UserJWT, UserLogin, UserRegistration } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserLogin, fetchUserRegistration } from "../api/userAuthQueries";
import { useUserStore } from "./useUserStore";

export const useUserAuthQueries = () => {
  const queryClient = useQueryClient();
  const { setUser, resetUser } = useUserStore();

  const userRegistation = useMutation<UserJWT, Error, UserRegistration>({
    mutationKey: ["user-registration"],
    mutationFn: fetchUserRegistration,
    onSuccess: () => {},
  });

  const userLogin = useMutation<UserJWT, Error, UserLogin>({
    mutationKey: ["user-login"],
    mutationFn: fetchUserLogin,
    onSuccess: (data) => {
      setUser({ ...data, status: "AUTHORIZED" });
    },
    onError: (error) => {
      console.log(error);
      resetUser();
    },
  });

  return {
    fetchUserRegistration: userRegistation.mutate,
    userRegistrationData: userRegistation.data,
    isErrorUserRegistration: userRegistation.isError,
    isSuccessUserRegistration: userRegistation.isSuccess,
    isPendingUserRegistration: userRegistation.isPending,

    fetchUserLogin: userLogin.mutate,
    userLoginData: userLogin.data,
    isErrorUserLogin: userLogin.isError,
    isSuccessUserLogin: userLogin.isSuccess,
    isPendingUserLogin: userLogin.isPending,
  };
};
