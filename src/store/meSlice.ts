import { create } from "zustand";

type MeState = {
  refetchMe: boolean;
  setRefetchMe: (refetch: boolean) => void;
};

export const useMeSlice = create<MeState>((set) => ({
  refetchMe: false,
  setRefetchMe: (refetchMe) => set({ refetchMe }),
}));
