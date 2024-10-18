import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Spot {
  guid: string;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  state: string;
  city: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const STORAGE_KEY = "spots";

// Helper functions
const getStoredSpots = (): Spot[] => {
  if (typeof window === "undefined") return []; // Handle server-side rendering
  try {
    const storedSpots = localStorage.getItem(STORAGE_KEY);
    return storedSpots ? JSON.parse(storedSpots) : [];
  } catch (error) {
    console.error("Error retrieving spots from localStorage:", error);
    return [];
  }
};

const setStoredSpots = (spots: Spot[]): void => {
  if (typeof window === "undefined") return; // Handle server-side rendering
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(spots));
  } catch (error) {
    console.error("Error saving spots to localStorage:", error);
  }
};

// React Query hooks
export const useSpots = () => {
  return useQuery<Spot[], Error>({
    queryKey: ["spots"],
    queryFn: () => Promise.resolve(getStoredSpots()),
  });
};

export const useAddSpot = () => {
  const queryClient = useQueryClient();

  return useMutation<Spot, Error, Spot>({
    mutationFn: (newSpot) => {
      return new Promise((resolve, reject) => {
        const spots = getStoredSpots();
        if (spots.some((s) => s.guid === newSpot.guid)) {
          reject(new Error("Spot with this GUID already exists"));
        } else {
          const updatedSpots = [...spots, newSpot];
          setStoredSpots(updatedSpots);
          resolve(newSpot);
        }
      });
    },
    onSuccess: (newSpot) => {
      queryClient.setQueryData<Spot[]>(["spots"], (oldSpots) =>
        oldSpots ? [...oldSpots, newSpot] : [newSpot]
      );
    },
  });
};

export const useDeleteSpot = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: (guid) => {
      return new Promise((resolve, reject) => {
        const spots = getStoredSpots();
        const updatedSpots = spots.filter((spot) => spot.guid !== guid);
        if (updatedSpots.length === spots.length) {
          reject(new Error("Spot not found"));
        } else {
          setStoredSpots(updatedSpots);
          resolve(guid);
        }
      });
    },
    onSuccess: (deletedGuid) => {
      queryClient.setQueryData<Spot[]>(["spots"], (oldSpots) =>
        oldSpots ? oldSpots.filter((spot) => spot.guid !== deletedGuid) : []
      );
    },
  });
};
