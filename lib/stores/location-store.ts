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
}

// Create the store
export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  error: null,
  isLoading: true,
  setLocation: (location: Location) => set({ location, error: null }),
  setError: (error: string | null) => set({ error }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));

// Initialize geolocation when imported on the client side
if (typeof window !== "undefined") {
  // Set loading state
  useLocationStore.getState().setLoading(true);

  // Get user's geolocation
  navigator.geolocation.getCurrentPosition(
    (position) => {
      useLocationStore.getState().setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      useLocationStore.getState().setLoading(false);
    },
    (error) => {
      let errorMessage = "Unable to retrieve your location";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location access denied";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information unavailable";
          break;
        case error.TIMEOUT:
          errorMessage = "Location request timed out";
          break;
      }

      useLocationStore.getState().setError(errorMessage);
      useLocationStore.getState().setLoading(false);
    }
  );
}
