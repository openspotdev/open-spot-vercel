import { create } from "zustand";

// Define the store state type
interface RadiusState {
  radius: number;
  setRadius: (radius: number) => void;
}

// Create the store
export const useRadiusStore = create<RadiusState>((set) => ({
  radius: 24, // Default radius value
  setRadius: (radius: number) => set({ radius }),
}));
