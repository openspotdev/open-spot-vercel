import { create } from "zustand";

// Define location types
export interface Location {
  lat: number;
  lng: number;
}

// Define the store state type
interface LocationState {
  location: Location | null;
  error: string | null;
  isLoading: boolean;
  setLocation: (location: Location) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  initializeGeolocation: () => void;
}

// Create the store
export const useLocationStore = create<LocationState>()((set) => ({
  location: null,
  error: null,
  isLoading: false,
  setLocation: (location: Location) => set({ location, error: null }),
  setError: (error: string | null) => set({ error }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  initializeGeolocation: () => {
    // This function should only be called on the client side
    if (typeof window === "undefined") return;

    set({ isLoading: true });

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          set({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            error: null,
            isLoading: false,
          });
        },
        (error) => {
          let errorMessage = "Unable to retrieve your location";

          if (error.code === 1) {
            // PERMISSION_DENIED
            errorMessage = "Location access denied";
          } else if (error.code === 2) {
            // POSITION_UNAVAILABLE
            errorMessage = "Location information unavailable";
          } else if (error.code === 3) {
            // TIMEOUT
            errorMessage = "Location request timed out";
          }

          set({ error: errorMessage, isLoading: false });
        }
      );
    } catch (error) {
      set({
        error: "Geolocation is not supported by this browser.",
        isLoading: false,
      });
    }
  },
}));
