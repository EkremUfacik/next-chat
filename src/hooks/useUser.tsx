import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  email: string;
  username: string;
  pic: string;
  isAdmin: boolean;
}

interface UserStore extends User {
  login: (user: User) => void;
  logout: () => void;
}

const initialUser: User = {
  _id: "",
  email: "",
  username: "",
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
