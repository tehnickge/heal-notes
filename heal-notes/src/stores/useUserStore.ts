import { UserJWT } from "@/types/user";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

export type USER_STATUS = "UNAUTHORIZED" | "AUTHORIZED";

type State = {
  status: USER_STATUS;
  name: string;
  username: string;
  secondname: string | null;
  id: string;
};

type Actions = {
  setUser: (userJwtWithStaus: UserJWT & { status: USER_STATUS }) => void;
  resetUser: () => void;
};

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      status: "UNAUTHORIZED",
      name: "",
      username: "",
      secondname: null,
      id: "",

      setUser: (user) => set(() => ({ ...user })),
      resetUser: () =>
        set(() => ({
          status: "UNAUTHORIZED",
          name: "",
          username: "",
          secondname: null,
          id: "",
        })),
    }),
    {
      name: "user-storage",
    }
  )
);
