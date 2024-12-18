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
import { useLanguage } from "@/app/languageContext";

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
  const { texts, language } = useLanguage();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpot) return;

    const spotData = await handleAddSpot();
    if (spotData) {
      addSpotMutation.mutate(spotData);
    }
  };

  const handleAddSpot = async (): Promise<Spot> => {
    if (!newSpot) throw new Error(texts.spots.autocomplete.errorNoSelected);

    const results = await geocodeByAddress(newSpot.label);
    const { lat, lng } = await getLatLng(results[0]);
    const addressComponents = results[0].address_components;

    return {
      guid: newSpot.value.place_id,
      name: newSpot.value.structured_formatting.main_text,
      latitude: lat.toString(),
      longitude: lng.toString(),
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
    <div className="fixed bottom-0 left-0 p-8 flex justify-around gap-2 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <section className="flex mx-auto gap-2">
        <DynamicGooglePlacesAutocomplete
          debounce={500}
          minLengthAutocomplete={3}
          apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
          selectProps={{
            placeholder: texts.spots.autocomplete.placeholder,
            noOptionsMessage: () => texts.spots.autocomplete.noOptionsMessage,
            loadingMessage: () => texts.spots.autocomplete.loadingMessage,
            isDisabled: false,
            isClearable: true,
            escapeClearsValue: true,
            value: newSpot,
            onChange: (spot: NewSpot | null) => setNewSpot(spot),
            menuPlacement: "top",
            styles: {
              input: (provided) => ({
                ...provided,
                width: "200px",
              }),
              option: (provided) => ({
                ...provided,
                width: "200px",
                fontSize: "12px",
                height: "auto",
                textAlign: "left",
              }),
              menu: (provided) => ({
                ...provided,
                width: "200px",
                marginBottom: "4px",
                textAlign: "left",
              }),
            },
          }}
          apiOptions={{
            // language: "en",
            // region: "en",
            language,
            region: language,
          }}
        />
        <form id="spot-form" onSubmit={handleSave}>
          <Button type="submit" disabled={!newSpot}>
            {texts.spots.autocomplete.buttonText}
          </Button>
        </form>
      </section>
    </div>
  );
}
