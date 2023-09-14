import { create } from "zustand";

type SortState = {
  sortType: string;
  setSortType: (sortType: string) => void;
};

export const useSortStore = create<SortState>((set) => ({
  sortType: "none",
  setSortType: (sortType: string) => set({ sortType }),
}));
