"use client";

import { useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewSpot {
  label: string;
  value: {
    place_id: string;
    structured_formatting: {
      main_text: string;
    };
  };
}

interface SpotData {
  guid: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  country: string;
  state: string;
  city: string;
  selected: boolean;
  type: string;
}

export default function LocationAutocomplete() {
  const [newSpot, setNewSpot] = useState<NewSpot | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpot) return;

    const spotData = await handleAddSpot();
    if (spotData) {
      saveSpotToLocalStorage(spotData);
    }
  };

  const handleAddSpot = async (): Promise<SpotData | null> => {
    try {
      const results = await geocodeByAddress(newSpot.label);
      const { lat, lng } = await getLatLng(results[0]);
      const addressComponents = results[0].address_components;

      return {
        guid: newSpot.value.place_id,
        name: newSpot.value.structured_formatting.main_text,
        location: { latitude: lat, longitude: lng },
        country: getAddressComponent(addressComponents, "country"),
        state: getAddressComponent(
          addressComponents,
          "administrative_area_level_1"
        ),
        city: getAddressComponent(addressComponents, "locality"),
        selected: false,
        type: "sport",
      };
    } catch (error) {
      console.error("Error adding spot:", error);
      return null;
    }
  };

  const getAddressComponent = (components: any[], type: string): string => {
    const component = components.find((comp) => comp.types.includes(type));
    return component ? component.long_name : "";
  };

  const saveSpotToLocalStorage = (spotData: SpotData) => {
    const spots = JSON.parse(localStorage.getItem("spots") || "[]");
    localStorage.setItem("spots", JSON.stringify([...spots, spotData]));
  };

  return (
    <div className="flex w-full space-x-1 justify-between">
      <GooglePlacesAutocomplete
        minLengthAutocomplete={3}
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
        selectProps={{
          placeholder: "Search a location",
          isClearable: true,
          escapeClearsValue: true,
          value: newSpot,
          onChange: (spot: NewSpot | null) => setNewSpot(spot),
          styles: {
            input: (provided) => ({
              ...provided,
              fontSize: "12px",
              color: "#29272C",
              height: "28px",
              width: "240px",
            }),
            option: (provided) => ({
              ...provided,
              fontSize: "12px",
              color: "#29272C",
              height: "auto",
            }),
            singleValue: (provided) => ({
              ...provided,
              fontSize: "12px",
              color: "#1EA2E4",
            }),
          },
        }}
        apiOptions={{
          language: "en",
          region: "en",
        }}
      />
      <form id="spot-form" onSubmit={handleSave} className="mb-6 gap-2">
        <Button type="submit" disabled={!newSpot}>
          Save
        </Button>
      </form>
    </div>
  );
}
