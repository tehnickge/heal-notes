import { UserJWT, UserRegistration } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserRegistration } from "../api/userAuthQueries";

export const useUserAuthQueries = () => {
  const queryClient = useQueryClient();

  const userRegistation = useMutation<UserJWT, Error, UserRegistration>({
    mutationKey: ["user-registration"],
    mutationFn: fetchUserRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-registration"] });
    },
  });

  return {
    fetchUserRegistration: userRegistation.mutate,
    userRegistrationData: userRegistation.data,
    isErrorUserRegistration: userRegistation.isError,
    isSuccessUserRegistration: userRegistation.isSuccess,
  };
};
