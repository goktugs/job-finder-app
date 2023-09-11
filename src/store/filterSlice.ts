import { create } from "zustand";

type FilterState = {
  filterQuery: string;
  setFilterQuery: (filter: string) => void;
  filterByLocation: string;
  setFilterByLocation: (filterByLocation: string) => void;
  filterBySalary: {
    min: number;
    max: number;
  };
  setFilterBySalary: (filterBySalary: { min: number; max: number }) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  filterQuery: "",
  setFilterQuery: (filter) => set({ filterQuery: filter }),
  filterByLocation: "",
  setFilterByLocation: (filterByLocation) => set({ filterByLocation }),
  filterBySalary: {
    min: 0,
    max: 0,
  },
  setFilterBySalary: (filterBySalary) => set({ filterBySalary }),
}));
