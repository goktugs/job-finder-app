import { create } from "zustand";

type SortState = {
  sortByDate: string;
  setSortByDate: (sortByDate: string) => void;
  sortBySalary: string;
  setSortBySalary: (sortBySalary: string) => void;
};

export const useSortStore = create<SortState>((set) => ({
  sortByDate: "",
  setSortByDate: (sortByDate: string) => set({ sortByDate }),
  sortBySalary: "",
  setSortBySalary: (sortBySalary: string) => set({ sortBySalary }),
}));
