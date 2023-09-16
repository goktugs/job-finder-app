import { create } from "zustand";

type LoggedInState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const useLoggedInSlice = create<LoggedInState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: localStorage.getItem("accessToken")
    ? () => set({ isLoggedIn: true })
    : () => set({ isLoggedIn: false }),
}));
