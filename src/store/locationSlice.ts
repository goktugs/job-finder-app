import { create } from "zustand";

type LocationState = {
  locations: string[];
  setLocations: (locations: string[]) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  locations: [],
  setLocations: (locations: string[]) => set({ locations }),
}));
