import { create } from "zustand";

type FilterState = {
  filterQuery: string;
  setFilterQuery: (filter: string) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  filterQuery: "",
  setFilterQuery: (filter) => set({ filterQuery: filter }),
}));
