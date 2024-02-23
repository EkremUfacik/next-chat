import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  pic: string;
  isAdmin: boolean;
}

interface UserStore extends User {
  login: (user: User) => void;
  logout: () => void;
}

const initialUser: User = {
  id: "",
  email: "",
  name: "",
  pic: "",
  isAdmin: false,
};

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      ...initialUser,
      login: (user: User) => set(user),
      logout: () => set(initialUser),
    }),
    {
      name: "user",
    }
  )
);
