import { create } from "zustand";

type Search = {
  searchValue: string;
  setSearch: (value: string) => void;
};

export const useSearch = create<Search>()((set) => ({
  searchValue: "",
  setSearch: (value) => set(() => ({ searchValue: value })),
}));
