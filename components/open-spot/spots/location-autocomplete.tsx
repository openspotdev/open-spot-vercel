"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { Button } from "@/components/ui/button";
const DynamicGooglePlacesAutocomplete = dynamic(
  () => import("react-google-places-autocomplete").then((mod) => mod.default),
  { ssr: false }
);

import { useAddSpot, Spot } from "@/lib/hooks/useSpotsRepository";

interface NewSpot {
  label: string;
  value: {
    place_id: string;
    structured_formatting: {
      main_text: string;
    };
  };
}

export default function LocationAutocomplete() {
  const [newSpot, setNewSpot] = useState<NewSpot | null>(null);
  const addSpotMutation = useAddSpot();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpot) return;

    const spotData = await handleAddSpot();
    if (spotData) {
      addSpotMutation.mutate(spotData);
    }
  };

  const handleAddSpot = async (): Promise<Spot> => {
    if (!newSpot) throw new Error("No spot selected");

    const results = await geocodeByAddress(newSpot.label);
    const { lat, lng } = await getLatLng(results[0]);
    const addressComponents = results[0].address_components;

    return {
      guid: newSpot.value.place_id,
      name: newSpot.value.structured_formatting.main_text,
      latitude: lat,
      longitude: lng,
      country: getAddressComponent(addressComponents, "country"),
      state: getAddressComponent(
        addressComponents,
        "administrative_area_level_1"
      ),
      city: getAddressComponent(addressComponents, "locality"),
      selected: false,
      type: "sport",
    };
  };

  const getAddressComponent = (components: any[], type: string): string => {
    const component = components.find((comp) => comp.types.includes(type));
    return component ? component.long_name : "";
  };

  return (
    <div className="flex w-full space-x-1 justify-between">
      <DynamicGooglePlacesAutocomplete
        minLengthAutocomplete={3}
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
        selectProps={{
          placeholder: "Lugares favoritos",
          noOptionsMessage: () => "Intenta un skatepark",
          loadingMessage: () => "Buscando...",
          isDisabled: false,
          isClearable: true,
          escapeClearsValue: true,
          value: newSpot,
          onChange: (spot: NewSpot | null) => setNewSpot(spot),
          styles: {
            input: (provided) => ({
              ...provided,
              width: "200px",
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
          Agregar
        </Button>
      </form>
    </div>
  );
}
