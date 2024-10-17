"use client";

interface Spot {
  guid: string;
  // Add other properties as needed
}

const STORAGE_KEY = "spots";

class SpotsRepository {
  private static getSpots(): Spot[] {
    try {
      const storedSpots = localStorage.getItem(STORAGE_KEY);
      return storedSpots ? JSON.parse(storedSpots) : [];
    } catch (error) {
      console.error("Error retrieving spots from localStorage:", error);
      return [];
    }
  }

  private static setSpots(spots: Spot[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(spots));
    } catch (error) {
      console.error("Error saving spots to localStorage:", error);
    }
  }

  static addSpot(spot: Spot): { success: boolean; message: string } {
    try {
      const spots = this.getSpots();
      if (spots.some((s) => s.guid === spot.guid)) {
        return {
          success: false,
          message: "Spot with this GUID already exists",
        };
      }
      this.setSpots([...spots, spot]);
      return { success: true, message: "Spot added successfully" };
    } catch (error) {
      console.error("Error adding spot:", error);
      return { success: false, message: "Failed to add spot" };
    }
  }

  static deleteSpot(guid: string): { success: boolean; message: string } {
    try {
      const spots = this.getSpots();
      const updatedSpots = spots.filter((spot) => spot.guid !== guid);
      if (updatedSpots.length === spots.length) {
        return { success: false, message: "Spot not found" };
      }
      this.setSpots(updatedSpots);
      return { success: true, message: "Spot deleted successfully" };
    } catch (error) {
      console.error("Error deleting spot:", error);
      return { success: false, message: "Failed to delete spot" };
    }
  }

  static getAllSpots(): Spot[] {
    return this.getSpots();
  }
}

export default SpotsRepository;
