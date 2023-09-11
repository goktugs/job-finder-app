import { create } from "zustand";

type ListTypeState = {
  listType: boolean;
  setListType: (listType: boolean) => void;
};

export const useListTypeStore = create<ListTypeState>((set) => ({
  listType: false,
  setListType: (listType) => set({ listType: listType }),
}));
